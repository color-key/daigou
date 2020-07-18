# -*- coding: utf-8 -*-
from config import appdef
from model.product.goods import Goods
from model.product.product_config import ProductConfig, WebsiteTypeEnum
from model.product.website_info import WebsiteInfo
from model.user.user import User
from model.user.user_goods import UserGoods
from model.user.user_notice_record import UserNoticeRecord
from model.user.user_notice_record_latest import UserNoticeRecordLatest


def create_db():
    # appdef.db_purchase.drop_tables([User, WebsiteInfo, ProductConfig, Goods, UserGoods, UserNoticeRecord, UserNoticeRecordLatest])
    # appdef.db_purchase.create_tables([User, WebsiteInfo, ProductConfig, Goods, UserGoods, UserNoticeRecord, UserNoticeRecordLatest])
    appdef.db_purchase.drop_tables([UserGoods, UserNoticeRecord])
    appdef.db_purchase.create_tables([UserGoods,  UserNoticeRecord])


def init_user():
    user = User()
    user.name = '李雷'
    user.mobile = '13771801234'
    user.address = '地址'
    user.save()


def init_product_config():
    product_config = ProductConfig()
    product_config.website_type = WebsiteTypeEnum.lottedfs_mobile
    product_config.name = '雪花秀'
    product_config.brnd_no = '16394'
    product_config.price_min = 22
    product_config.price_max = 629
    product_config.save()


def init_website_info():
    website_info_1 = WebsiteInfo()
    website_info_1.name = '乐天手机网站'
    website_info_1.website_type = WebsiteTypeEnum.lottedfs_mobile
    website_info_1.website_url = 'http://m.chn.lottedfs.cn/kr'
    website_info_1.save()

    website_info_2 = WebsiteInfo()
    website_info_2.name = '乐天电脑网站'
    website_info_2.website_type = WebsiteTypeEnum.lottedfs_pc
    website_info_2.website_url = 'http://chn.lottedfs.cn/kr'
    website_info_2.save()

    website_info_3 = WebsiteInfo()
    website_info_3.name = '新罗手机网站'
    website_info_3.website_type = WebsiteTypeEnum.shilladfs_mobile
    website_info_3.website_url = 'http://m.shilladfs.com'
    website_info_3.save()

    website_info_4 = WebsiteInfo()
    website_info_4.name = '新罗电脑网站'
    website_info_4.website_type = WebsiteTypeEnum.shilladfs_pc
    website_info_4.website_url = 'http://www.shilladfs.com'
    website_info_4.save()

    website_info_5 = WebsiteInfo()
    website_info_5.name = '爱宝客手机网站'
    website_info_5.website_type = WebsiteTypeEnum.shillaipark_mobile
    website_info_5.website_url = 'http://m.shillaipark.com'
    website_info_5.save()

    website_info_6 = WebsiteInfo()
    website_info_6.name = '爱宝客电脑网站'
    website_info_6.website_type = WebsiteTypeEnum.shillaipark_pc
    website_info_6.website_url = 'http://www.shillaipark.com'
    website_info_6.save()

    website_info_7 = WebsiteInfo()
    website_info_7.name = '新世界明洞手机网站'
    website_info_7.website_type = WebsiteTypeEnum.ssgdfm_mobile
    website_info_7.website_url = 'http://mcn.ssgdfm.com'
    website_info_7.save()

    website_info_8 = WebsiteInfo()
    website_info_8.name = '新世界明洞电脑网站'
    website_info_8.website_type = WebsiteTypeEnum.ssgdfm_pc
    website_info_8.website_url = 'http://cn.ssgdfm.com'
    website_info_8.save()

    website_info_9 = WebsiteInfo()
    website_info_9.name = '东和手机网站'
    website_info_9.website_type = WebsiteTypeEnum.dwdfs_mobile
    website_info_9.website_url = 'http://mcn.dwdfs.com'
    website_info_9.save()

    website_info_10 = WebsiteInfo()
    website_info_10.name = '东和电脑网站'
    website_info_10.website_type = WebsiteTypeEnum.dwdfs_pc
    website_info_10.website_url = 'http://cn.dwdfs.com'
    website_info_10.save()

    website_info_11 = WebsiteInfo()
    website_info_11.name = '现代手机网站'
    website_info_11.website_type = WebsiteTypeEnum.hd_dfs_mobile
    website_info_11.website_url = 'https://mcn.hd-dfs.com'
    website_info_11.save()

    website_info_12 = WebsiteInfo()
    website_info_12.name = '现代电脑网站'
    website_info_12.website_type = WebsiteTypeEnum.hd_dfs_pc
    website_info_12.website_url = 'https://cn.hd-dfs.com'
    website_info_12.save()


# create_db()
# init_user()
# init_product_config()
# init_website_info()
