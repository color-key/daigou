# -*- coding: utf-8 -*-
from datetime import datetime

from peewee import *

from model import BaseModel


class Goods(BaseModel):
    """ 检测网站产品明细 """
    # 网站类型 see:product_config.WebsiteTypeEnum
    website_type = IntegerField()
    # 商品名称
    name = CharField()
    # 商品编号
    prd_no = CharField()
    # 商品明细编号
    prd_opt_no = CharField()
    # 品牌
    brand = CharField()
    # 品牌英文名
    brand_en = CharField()
    # 图片地址
    img_url = CharField()
    # 价格
    price = CharField()
    # 折扣
    discount = CharField()
    # 折后价格
    discount_price = CharField()
    # 是否被删除
    deleted = BooleanField(default=False)
    # 更新时间
    update_time = DateTimeField(null=True)
    # 创建时间
    create_time = DateTimeField(default=datetime.now())
