# -*- coding: utf-8 -*-
from datetime import datetime

from peewee import *
from model import BaseModel


class UserNoticeRecord(BaseModel):
    """ 用户消息通知记录 """
    # 用户ID
    user_id = CharField()
    # 商品ID
    goods_id = CharField()
    # 是否被删除
    deleted = BooleanField(default=False)
    # 更新时间
    update_time = DateTimeField(null=True)
    # 创建时间
    create_time = DateTimeField(default=datetime.now())

    class Meta:
        table_name = 'user_notice_record'
