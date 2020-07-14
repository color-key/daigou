# -*- coding: utf-8 -*-
import math
from typing import TypeVar

# from peewee import BaseModelSelect, SelectQuery, SelectBase
from peewee import SelectBase

T = TypeVar('T')


class BaseService:
    def __init__(self):
        pass

    @classmethod
    def find_obj_with_id(cls, model: T, _id: str) -> type(T):
        pass

    @classmethod
    def find_obj_list_with(cls, model: T, **kwargs):
        pass

    @classmethod
    def page_count_list_process(cls, query_set, page: int, page_size: int) -> (int, int, int, list):
        count = 0
        if isinstance(query_set, SelectBase):
            count = query_set.count()
        else:
            count = len(query_set)
        total_page = math.ceil(count / page_size)
        ret_list = []
        if count > 0:
            ret_list = query_set.paginate(page, page_size)
        return total_page, count, page, ret_list
