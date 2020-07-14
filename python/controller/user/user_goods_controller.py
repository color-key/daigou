# -*- coding: utf-8 -*-
from controller.basic import HttpCode
from controller.basic.basic_controller import BasicController
from controller.basic.parameters import parameters, Check
from service.user.user_goods_service import UserGoodsService


class UserGoodsController(BasicController):

    @parameters(
        user_id=Check(type=int, null=False),
        goods_id=Check(type=int, null=False),
    )
    def create(self, params):
        """ 更新商品库，通过监测商品ID """
        boo, value = UserGoodsService.create(**params)
        if boo:
            return self.response_success()
        else:
            return self.response_fail(HttpCode.fail, value)

    @parameters(
        user_id=Check(type=int, null=False),
        page=Check(type=int, null=False),
        page_size=Check(type=int, null=False),
    )
    def find_goods_page(self, params):
        """ 查询用户关注商品 """
        result = UserGoodsService.find_goods_page_by_user_id(**params)
        return self.response_success(result)
