# -*- coding: utf-8 -*-
from peewee import *
from model import BaseModel
from datetime import datetime


class User(BaseModel):
    # 名字
    name = CharField()
    # 手机号
    mobile = CharField(null=True)
    # 地址
    address = CharField(null=True)
    # 是否被删除
    deleted = BooleanField(default=False)
    # 更新时间
    update_time = DateTimeField(null=True)
    # 创建时间
    create_time = DateTimeField(default=datetime.now)
