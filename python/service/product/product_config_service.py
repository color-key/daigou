# -*- coding: utf-8 -*-
from model.product.product_config import ProductConfig
from service import BaseService


class ProductConfigService(BaseService):

    @classmethod
    def create(cls, **params) -> (bool, any):
        product_config_old = ProductConfig.select().where(website_type=params['website_type'], name=params['name'])
        if product_config_old:
            return False, "新增失败，同类型网站下，商品不能重名"

        product_config = ProductConfig()
        product_config.website_type = params['source']
        product_config.name = params['name']
        product_config.brnd_no = params['brnd_no']
        product_config.price_min = params['price_min']
        product_config.price_max = params['price_max']
        product_config.save()
        return False, product_config
