# -*- coding: utf-8 -*-
from libs.base_enum import BaseEnum


class HttpCode(BaseEnum):
    success = 200
    fail = 400
    auth_error = 401
    washing = 800
