# -*- coding: utf-8 -*-
from datetime import datetime

from libs.mysql_extend import MysqlExtend
from model.product.goods import Goods
from model.product.product_config import WebsiteTypeEnum, ProductConfig
from model.user.user_goods import UserGoods
from service import BaseService
from service.website.lotte_service import LotteService


class GoodsService(BaseService):

    @classmethod
    def find_page(cls, **params) -> (bool, any):
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
        return cls.search_goods_detail(goods)

    @classmethod
    def update_goods_by_config_id(cls, _id: int):
        """ 更新商品库，通过监测商品ID """
        product_config = ProductConfig.get_by_id(_id)
        cls.update_goods(product_config)

    @classmethod
    def update_goods(cls, product_config: ProductConfig):
        """ 更新商品库 """
        if product_config.website_type == WebsiteTypeEnum.lottedfs_mobile:
            """ 乐天手机网站商品更新 """
            LotteService.pull_html_data(product_config.name, product_config.brnd_no, product_config.price_min, product_config.price_max)
            pass

    @classmethod
    def search_goods_detail(cls, goods: Goods) -> bool:
        """ 查询商品详情 """
        if goods.website_type == WebsiteTypeEnum.lottedfs_mobile:
            boo = LotteService.pull_html_detail(goods.prd_no, goods.prd_opt_no)
            return boo
        return False

    @classmethod
    def task_search_goods_detail(cls):
        """ 定时获取商详情 """
        query_list = UserGoods.select().where(UserGoods.deleted == 0)
        for query in query_list:
            boo = cls.search_goods_detail(query)
            if boo:
                print('网站：%s,商品:%s,已经上架' % (WebsiteTypeEnum.title_with_value(query.website_type), query.name))
            if boo:
                print('网站：%s,商品:%s,尚未上架' % (WebsiteTypeEnum.title_with_value(query.website_type), query.name))

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
