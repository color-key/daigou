# -*- coding: utf-8 -*-
from datetime import datetime

from libs.mysql_extend import MysqlExtend
from model.product.product_config import ProductConfig
from service import BaseService


class ProductConfigService(BaseService):

    @classmethod
    def create(cls, **params) -> (bool, any):
        product_config_old = ProductConfig.select().where(ProductConfig.website_type == params['website_type'], ProductConfig.name == params['name'])
        if product_config_old:
            return False, "新增失败，同类型网站下，商品不能重名"

        product_config = ProductConfig()
        product_config.website_type = params['website_type']
        product_config.name = params['name']
        product_config.brnd_no = params['brnd_no']
        product_config.price_min = params['price_min']
        product_config.price_max = params['price_max']
        product_config.save()
        return True, product_config

    @classmethod
    def find_page(cls, **params) -> (bool, any):
        page = params['page']
        page_size = params['page_size']
        keyword = params.get('keyword')
        conditions = (ProductConfig.deleted == 0,)
        if keyword:
            conditions = ProductConfig.name.contains(keyword), conditions
        query = ProductConfig.select().where(*conditions).order_by(-ProductConfig.create_time)

        total_page, count, page, query_list = cls.page_count_list_process(query, page, page_size)
        pc_list = MysqlExtend.mysql_to_python(query_list, pop_keys=['deleted'])
        return dict(total_page=total_page, count=count, page=page, data_list=pc_list)

    @classmethod
    def delete(cls, **params):
        query = ProductConfig.get_by_id(params['id'])
        query.deleted = True
        query.update_time = datetime.now()
        query.save()
