# -*- coding: utf-8 -*-
import threading

from controller.basic.basic_controller import BasicController
from controller.basic.parameters import parameters, Check
from service.product.goods_service import GoodsService


class GoodsController(BasicController):

    @parameters(
        id=Check(type=int, null=False),
    )
    def update_goods_by_config_id(self, params):
        """ 更新商品库，通过监测商品ID """
        GoodsService.update_goods_by_config_id(params['id'])
        return self.response_success()

    @parameters(
        page=Check(type=int, null=False),
        page_size=Check(type=int, null=False),
        website_type=Check(type=int),
        keyword=Check(type=str)
    )
    def page(self, params):
        """ 查询商品分页列表 """
        result = GoodsService.find_page(**params)
        return self.response_success(result)

    @parameters(
        id=Check(type=int, null=False),
    )
    def find_detail_by_id(self, params):
        """ 查询商品详情 """
        code = GoodsService.search_goods_detail_by_id(params['id'])
        return self.response_success(code)

    def search_detail(self):
        threading.Thread(target=GoodsService.task_search_goods_detail).start()
        return self.response_success()
