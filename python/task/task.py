# -*- coding: utf-8 -*-
import threading

from service.product.goods_service import GoodsService


class Task(object):

    @staticmethod
    def run_task_search_goods_detail():
        """ 定时查询商品详情 """
        threading.Thread(target=GoodsService.task_search_goods_detail).start()

    @staticmethod
    def run_task_update_goods():
        """ 更新商品库 """
        threading.Thread(target=GoodsService.task_update_goods).start()
