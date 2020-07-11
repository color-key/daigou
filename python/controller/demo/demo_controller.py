# -*- coding: utf-8 -*-
from controller.basic.basic_controller import BasicController
from controller.basic.parameters import parameters, Check


class DemoController(BasicController):
    """ python测试demo """
    @parameters(
        username=Check(type=str, null=False),
        password=Check(type=str, null=False)
    )
    def test(self, params):
        username = params['username']
        password = params['password']
        print('username:%s,password:%s' % (username, password))
        return self.response_success('hello world')

