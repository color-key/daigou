# -*- coding: utf-8 -*-
from sanic.response import json, text

from config.white_router import white_router_list
from controller.basic import HttpCode
import json as json_json


class BasicController(object):

    def __init__(self, request, action):
        self.request = request
        self.action = action
        self.files = []
        self.params = self.find_params()
        self.is_white_router = self.is_white_router()
        print('请求参数：%s' % self.params)

    def find_params(self):
        if self.request.method == 'OPTIONS':
            return {}
        if self.request.content_type == 'application/json':
            body = self.request.body
            if isinstance(body, bytes):
                body = body.decode()
            return json_json.loads(body) if body else {}
        params = self.request.args
        if params:
            return params
        try:
            params = self.request.json
            if params:
                return params
            else:
                return {}
        except:
            params = self.request.form
            self.files = self.request.files
            _params = params
            for k, v in _params.items():
                print(k, v)
                params[k] = v[0]
            return dict(params)

    def is_white_router(self) -> bool:
        has = False
        for p in white_router_list:
            if self.request.path.find(p) > -1:
                has = True
                break
        return has

    def execute_method(self, name):
        if self.request.method == 'OPTIONS':
            return self.response_success()
        try:
            # todo 验证token
            token = self.request.headers.get('token', None)
            if not self.is_white_router:
                return self.response_fail(HttpCode.auth_error, '登录令牌已失效，请重新登录')
            else:
                rsp = getattr(self, name)()
                return rsp
        except Exception as e:
            print('error: ', e)
            return self.response_fail(HttpCode.fail, 'function %s error' % name)

    def process(self):
        return self.execute_method(self.action)

    def response_success(self, data=None):
        return self.response(code=HttpCode.success, data=data)

    def response_fail(self, code=HttpCode.fail, msg=''):
        return self.response(code=code, msg=msg)

    @staticmethod
    def response(code=HttpCode.success, msg='', data=None):
        result = dict(code=code, msg=msg, data=data)
        print('返回：%s' % result)
        return json(result, headers={'Access-Control-Allow-Credentials': True})

    @staticmethod
    def response_text(content):
        print(content)
        return text(content)
