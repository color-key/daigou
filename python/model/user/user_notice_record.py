# -*- coding: utf-8 -*-
from datetime import datetime

from peewee import *

from libs.base_enum import BaseEnum
from model import BaseModel


class NoticeTypeEnum(BaseEnum):
    on_shelf = 10
    off_shelf = 20

    __meta__ = {
        'title_kv': {
            on_shelf: '上架',
            off_shelf: '下架',
        }
    }


class UserNoticeRecord(BaseModel):
    """ 用户消息通知记录 """
    # 消息类型，see:NoticeTypeEnum
    notice_type = IntegerField()
    # 用户ID
    user_id = IntegerField()
    user_name = CharField()
    # 商品ID
    goods_id = IntegerField()
    goods_name = CharField()
    # 是否被删除
    deleted = BooleanField(default=False)
    # 更新时间
    update_time = DateTimeField(null=True)
    # 创建时间
    create_time = DateTimeField(default=datetime.now)

    class Meta:
        table_name = 'user_notice_record'
