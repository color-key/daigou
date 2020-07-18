# -*- coding: utf-8 -*-
from peewee import *
from model import BaseModel
from datetime import datetime


class WebsiteInfo(BaseModel):
    """ 监测网站列表 """
    # 网站名字
    name = CharField()
    # 网站类型 see:WebsiteTypeEnum
    website_type = IntegerField()
    # 网址
    website_url = CharField()
    # 是否被删除
    deleted = BooleanField(default=False)
    # 更新时间
    update_time = DateTimeField(null=True)
    # 创建时间
    create_time = DateTimeField(default=datetime.now)

    class Meta:
        table_name = 'website_info'
