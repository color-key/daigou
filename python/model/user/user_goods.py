# -*- coding: utf-8 -*-
from peewee import *
from model import BaseModel
from datetime import datetime


class UserGoods(BaseModel):
    """ 用户关注商品 """
    # 用户ID
    user_id = IntegerField()
    user_name = CharField()
    # 商品ID
    goods_id = IntegerField()
    # 商品名称
    goods_name = CharField()
    # 商品网站类型
    website_type = IntegerField()
    # 商品编号
    prd_no = CharField()
    # 商品明细编号
    prd_opt_no = CharField()
    # 是否被删除
    deleted = BooleanField(default=False)
    # 更新时间
    update_time = DateTimeField(null=True)
    # 创建时间
    create_time = DateTimeField(default=datetime.now)

    class Meta:
        table_name = 'user_goods'
