# -*- coding: utf-8 -*-
from datetime import date, datetime

from peewee import BaseModelSelect
from playhouse.shortcuts import model_to_dict

from model import BaseModel


class MysqlExtend(object):

    @classmethod
    def mysql_to_python(cls, data, pop_keys=[], date_format='%Y-%m-%d %H:%M:%S', blacklist=True):
        def process(d):
            if isinstance(d, BaseModelSelect):
                data_list = []
                for dd in d:
                    _d = process(dd)
                    data_list.append(_d)
                return data_list
            elif isinstance(d, BaseModel):
                dd = dict()
                for key, value in model_to_dict(d).items():
                    if blacklist:
                        if pop_keys and key in pop_keys:
                            continue
                    else:
                        if pop_keys and key not in pop_keys:
                            continue
                    if isinstance(value, (date, datetime)):
                        dd[key] = value.strftime(date_format)
                    else:
                        dd[key] = value
                return dd
        return process(data)
