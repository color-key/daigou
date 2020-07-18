# -*- coding: utf-8 -*-
from datetime import datetime

from libs.mysql_extend import MysqlExtend
from model.user.user import User
from service import BaseService


class UserService(BaseService):

    @classmethod
    def create(cls, **params) -> (bool, any):
        query = User.select().where(User.name == params['name'], User.deleted == 0)
        if query:
            return False, '添加失败，用户已存在'
        user = User()
        user.name = params['name']
        user.mobile = params.get('name')
        user.address = params.get('address')
        user.save()
        return True, user

    @classmethod
    def find_page(cls, **params) -> dict:
        page = params['page']
        page_size = params['page_size']
        keyword = params.get('keyword')
        conditions = (User.deleted == 0,)
        if keyword:
            conditions += (User.name.contains(keyword),)
        query = User.select().where(*conditions).order_by(-User.create_time)

        total_page, count, page, query_list = cls.page_count_list_process(query, page, page_size)
        pc_list = MysqlExtend.mysql_to_python(query_list, pop_keys=['deleted'])
        return dict(total_page=total_page, count=count, page=page, data_list=pc_list)

    @classmethod
    def delete(cls, **params):
        query = User.get_by_id(params['id'])
        query.deleted = True
        query.update_time = datetime.now()
        query.save()

