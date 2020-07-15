# -*- coding: utf-8 -*-
from datetime import datetime

from peewee import JOIN

from libs.mysql_extend import MysqlExtend
from model.product.goods import Goods
from model.product.product_config import WebsiteTypeEnum
from model.user.user import User
from model.user.user_goods import UserGoods
from service import BaseService


class UserGoodsService(BaseService):

    @classmethod
    def create(cls, **params) -> (bool, any):
        """ 新增用户关注商品 """
        user_id = params['user_id']
        goods_id = params['goods_id']
        user = User.get_by_id(user_id)
        if not user:
            return False, '添加关注失败，用户不存在'
        goods = Goods.get_by_id(goods_id)
        if not goods:
            return False, '添加关注失败，商品不存在'

        user_goods = UserGoods()
        user_goods.user_id = user_id
        user_goods.user_name = user.name
        user_goods.goods_id = goods_id
        user_goods.goods_name = goods.name
        user_goods.save()
        return True, user_goods

    @classmethod
    def find_goods_page_by_user_id(cls, **params) -> dict:
        """ 查询用户关注商品 """
        user_id = params['user_id']
        page = params['page']
        page_size = params['page_size']

        query = UserGoods.select(UserGoods.id, User.name.alias('user_name'), User.mobile, Goods.name.alias('goods_name'), Goods.website_type, Goods.brand, UserGoods.create_time)\
            .join(User, JOIN.LEFT_OUTER, on=(UserGoods.user_id == User.id))\
            .join(Goods, JOIN.LEFT_OUTER, on=(UserGoods.goods_id == Goods.id))\
            .where(UserGoods.user_id == user_id, User.id).order_by(-UserGoods.create_time).dicts()

        total_page, count, page, query_list = cls.page_count_list_process(query, page, page_size)
        ug_list = MysqlExtend.mysql_to_python(query_list, pop_keys=['deleted'])
        for ug in ug_list:
            ug['website_type_str'] = WebsiteTypeEnum.title_with_value(ug['website_type'])

        return dict(total_page=total_page, count=count, page=page, data_list=ug_list)

    @classmethod
    def delete(cls, **params):
        query = UserGoods.get_by_id(params['id'])
        query.deleted = True
        query.update_time = datetime.now()
        query.save()
