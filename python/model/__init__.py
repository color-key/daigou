# -*- coding: utf-8 -*-
from peewee import Model

# from config import appdef
from config.retry_mysql_database import RetryMySQLDatabase


class BaseModel(Model):
    class Meta:
        # database = appdef.db_purchase
        database = RetryMySQLDatabase.get_db_instance()
