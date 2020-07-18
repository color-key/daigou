# -*- coding: utf-8 -*-
from datetime import datetime

from libs.base_enum import BaseEnum
from model import BaseModel
from peewee import *


class WebsiteTypeEnum(BaseEnum):
    lottedfs_mobile = 10
    lottedfs_pc = 12
    shilladfs_mobile = 20
    shilladfs_pc = 22
    shillaipark_mobile = 30
    shillaipark_pc = 32
    ssgdfm_mobile = 40
    ssgdfm_pc = 42
    dwdfs_mobile = 50
    dwdfs_pc = 52
    hd_dfs_mobile = 60
    hd_dfs_pc = 62

    __meta__ = {
        'title_kv': {
            lottedfs_mobile: '乐天手机网站',
            lottedfs_pc: '乐天电脑网站',
            shilladfs_mobile: '新罗手机网站',
            shilladfs_pc: '新罗电脑网站',
            shillaipark_mobile: '爱宝客手机网站',
            shillaipark_pc: '爱宝客电脑网站',
            ssgdfm_mobile: '新世界明洞手机网站',
            ssgdfm_pc: '新世界明洞电脑网站',
            dwdfs_mobile: '东和手机网站',
            dwdfs_pc: '东和电脑网站',
            hd_dfs_mobile: '现代手机网站',
            hd_dfs_pc: '现代电脑网站',
        }
    }


class ProductConfig(BaseModel):
    """ 内部设置需爬取的商品 """
    # 网站类型 see:WebsiteTypeEnum
    website_type = IntegerField()
    # 商品名称
    name = CharField()
    # 品牌编号
    brnd_no = CharField(null=True)
    # 价格区间-最低价格
    price_min = IntegerField(null=True)
    # 价格区间-最高价格
    price_max = IntegerField(null=True)
    # 是否被删除
    deleted = BooleanField(default=False)
    # 更新时间
    update_time = DateTimeField(null=True)
    # 创建时间
    create_time = DateTimeField(default=datetime.now)

    class Meta:
        table_name = 'product_config'
