# -*- coding: utf-8 -*-
from typing import TypeVar

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
