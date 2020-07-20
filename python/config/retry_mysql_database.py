# -*- coding: utf-8 -*-
from abc import ABC

from playhouse.pool import PooledMySQLDatabase
from playhouse.shortcuts import ReconnectMixin
from config import appdef


class RetryMySQLDatabase(ReconnectMixin, PooledMySQLDatabase, ABC):
    _instance = None
    mysql_conf = appdef.config()['mysql'][0]

    @classmethod
    def get_db_instance(cls):
        if not cls._instance:
            cls._instance = RetryMySQLDatabase(
                cls.mysql_conf['name'],
                user=cls.mysql_conf['user'],
                password=cls.mysql_conf['password'],
                host=cls.mysql_conf['host'],
                port=cls.mysql_conf['port'],
                # host=cls.mysql_conf.get('db_host', '127.0.0.1'),
                # user=cls.mysql_conf.get('db_user', 'root'),
                # password=cls.mysql_conf.get('db_pwd', '123'),
                # port=cls.mysql_conf.get('db_port', 3306),
                max_connections=120,
                stale_timeout=300
            )
        return cls._instance
