# -*- coding: utf-8 -*-
from datetime import datetime

from libs.mysql_extend import MysqlExtend
from model.product.goods import Goods, ResultCode
from model.product.product_config import WebsiteTypeEnum, ProductConfig
from model.user.user_goods import UserGoods
from model.user.user_notice_record import NoticeTypeEnum, UserNoticeRecord
from model.user.user_notice_record_latest import UserNoticeRecordLatest
from service import BaseService
from service.website.lotte_service import LotteService


class GoodsService(BaseService):

    @classmethod
    def find_page(cls, **params) -> dict:
        """ 查询商品分页列表 """
        page = params['page']
        page_size = params['page_size']
        website_type = params.get('website_type')
        keyword = params.get('keyword')

        conditions = (Goods.deleted == 0,)
        if website_type:
            conditions += (Goods.website_type == website_type,)
        if keyword:
            conditions += (Goods.name.contains(keyword),)
        query = Goods.select().where(*conditions).order_by(-Goods.update_time)

        total_page, count, page, query_list = cls.page_count_list_process(query, page, page_size)
        pc_list = MysqlExtend.mysql_to_python(query_list, pop_keys=['deleted'])
        return dict(total_page=total_page, count=count, page=page, data_list=pc_list)

    @classmethod
    def search_goods_detail_by_id(cls, _id: int) -> bool:
        """ 获取指定商品详情 """
        goods = Goods.get_by_id(_id)
        return cls.search_goods_detail(goods.website_type, goods.prd_no, goods.prd_opt_no)

    @classmethod
    def update_goods_by_config_id(cls, _id: int):
        """ 更新商品库，通过监测商品ID """
        product_config = ProductConfig.get_by_id(_id)
        cls.update_goods(product_config)

    @classmethod
    def update_goods(cls, product_config: ProductConfig):
        """ 更新商品库 """
        try:
            if product_config.website_type == WebsiteTypeEnum.lottedfs_mobile:
                """ 乐天手机网站商品更新 """
                LotteService.pull_html_data(product_config.name, product_config.brnd_no, product_config.price_min, product_config.price_max)
        except Exception as e:
            print('更新商品库异常，异常：', e)

    @classmethod
    def search_goods_detail(cls, website_type: int, prd_no: str, prd_opt_no: str) -> int:
        """ 查询商品详情 """
        try:
            if website_type == WebsiteTypeEnum.lottedfs_mobile:
                code = LotteService.pull_html_detail(prd_no, prd_opt_no)
                return code
            return ResultCode.off_shelf
        except Exception as e:
            print('查询商品详情异常，异常：', e)
            return ResultCode.error

    @classmethod
    def task_search_goods_detail(cls):
        """ 定时获取商详情 """
        query_list = UserGoods.select().where(UserGoods.deleted == 0)
        # 商品信息字典
        goods_dict = {}
        goods_id_list = []
        for query in query_list:
            if goods_dict.get(query.goods_id):
                goods_dict[query.goods_id]['user'].append(dict(user_id=query.user_id, user_name=query.user_name))
            else:
                goods_id_list.append(query.goods_id)
                goods_dict[query.goods_id] = dict(
                    user=[dict(user_id=query.user_id, user_name=query.user_name)],
                    goods_name=query.goods_name,
                    website_type=query.website_type,
                    prd_no=query.prd_no,
                    prd_opt_no=query.prd_opt_no
                )

        # 用户最新的消息通知
        latest_query_list = UserNoticeRecordLatest.select().where(UserNoticeRecordLatest.goods_id in goods_id_list, UserNoticeRecordLatest.deleted == 0)
        latest_dict = {}
        for l_query in latest_query_list:
            latest_key = '%d-%d' % (l_query.user_id, l_query.goods_id)
            latest_dict[latest_key] = l_query

        print('准备监控商品上架情况，监控商品数量：%d' % len(goods_dict))
        for key, value in goods_dict.items():
            code = cls.search_goods_detail(value['website_type'], value['prd_no'], value['prd_opt_no'])
            print('网站：%s,商品:%s,上架情况:%s' % (WebsiteTypeEnum.title_with_value(value['website_type']), value['goods_name'], ResultCode.title_with_value(code)))
            # 非上架/下架 不处理
            if code not in [ResultCode.on_shelf, ResultCode.off_shelf]:
                continue

            for item in value['user']:
                user_id = item['user_id']
                user_name = item['user_name']
                latest_key = '%d-%d' % (user_id, key)

                notice_type = -1
                if code == ResultCode.on_shelf:
                    # 已发上架通知的跳过
                    if latest_dict.get(latest_key) and latest_dict[latest_key].notice_type == NoticeTypeEnum.on_shelf:
                        continue
                    notice_type = NoticeTypeEnum.on_shelf
                else:
                    # 已发下架通知的跳过
                    if latest_dict.get(latest_key) and latest_dict[latest_key].notice_type == NoticeTypeEnum.off_shelf:
                        continue
                    notice_type = NoticeTypeEnum.off_shelf
                # 创建消息记录
                record = UserNoticeRecord()
                record.notice_type = notice_type
                record.user_id = user_id
                record.user_name = user_name
                record.goods_id = key
                record.goods_name = value['goods_name']
                record.save()
                # 更新 or 创建 用户通知最新记录
                if latest_dict.get(latest_key):
                    latest_old = latest_dict[latest_key]
                    latest_old.notice_type = notice_type
                    latest_old.update_time = datetime.now()
                    latest_old.save()
                else:
                    latest = UserNoticeRecordLatest()
                    latest.notice_type = notice_type
                    latest.user_id = user_id
                    latest.user_name = user_name
                    latest.goods_id = key
                    latest.goods_name = value['goods_name']
                    latest.save()

    @classmethod
    def task_update_goods(cls):
        """ 定时更新商品库 """
        print('定时更新商品库，准备执行……')
        start_time = datetime.now()

        query_list = ProductConfig.select().where(ProductConfig.deleted == 0)
        print('定时更新商品库，开始执行，总计数量：%d' % query_list.count())
        for query in query_list:
            print('定时更新商品库，开始执行，网站：%s,查询商品：%s' % (WebsiteTypeEnum.title_with_value(query.website_type), query.name))
            cls.update_goods(query)
        seconds = (datetime.now() - start_time).seconds
        print('定时更新商品库，执行完毕，查询商品数量：%d，耗时:%d(秒)' % (query_list.count(), seconds))
