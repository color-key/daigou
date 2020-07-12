# -*- coding: utf-8 -*-
from datetime import datetime

from model.product.goods import Goods
from model.product.product_config import WebsiteTypeEnum, ProductConfig
from model.user.user_goods import UserGoods
from service import BaseService
from service.website.lotte_service import LotteService


class GoodsService(BaseService):

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
