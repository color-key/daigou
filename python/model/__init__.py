# -*- coding: utf-8 -*-
from peewee import Model

from config import appdef


class BaseModel(Model):
    class Meta:
        database = appdef.db_purchase
