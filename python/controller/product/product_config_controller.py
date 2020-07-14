# -*- coding: utf-8 -*-
from controller.basic import HttpCode
from controller.basic.basic_controller import BasicController
from controller.basic.parameters import parameters, Check
from service.product.product_config_service import ProductConfigService


class ProductConfigController(BasicController):

    @parameters(
        website_type=Check(type=int, null=False),
        name=Check(type=str, null=False),
        brnd_no=Check(type=str, null=False),
        price_min=Check(type=int, null=False),
        price_max=Check(type=int, null=False),
    )
    def create(self, params):
        """ 新增监测商品 """
        boo, value = ProductConfigService.create(**params)
        if boo:
            return self.response_success()
        else:
            return self.response_fail(HttpCode.fail, value)

    @parameters(
        page=Check(type=int, null=False),
        page_size=Check(type=int, null=False),
        keyword=Check(type=str)
    )
    def page(self, params):
        """ 查询商品监测分页列表 """
        result = ProductConfigService.find_page(**params)
        return self.response_success(result)

    @parameters(
        id=Check(type=int, null=False),
    )
    def delete(self, params):
        """ 删除监控商品 """
        ProductConfigService.delete(**params)
        return self.response_success()
