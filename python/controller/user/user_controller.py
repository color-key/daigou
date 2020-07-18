# -*- coding: utf-8 -*-
from controller.basic import HttpCode
from controller.basic.basic_controller import BasicController
from controller.basic.parameters import parameters, Check
from service.user.user_service import UserService


class UserController(BasicController):

    @parameters(
        page=Check(type=int, null=False),
        page_size=Check(type=int, null=False),
        keyword=Check(type=str)
    )
    def page(self, params):
        """ 查询用户关注商品 """
        try:
            result = UserService.find_page(**params)
            return self.response_success(result)
        except Exception as e:
            print(e)
            return self.response_fail(HttpCode.fail, '查询异常:%s' % e)

    @parameters(
        name=Check(type=str, null=False),
        mobile=Check(type=str),
        address=Check(type=str),
    )
    def create(self, params):
        """ 更新商品库，通过监测商品ID """
        boo, value = UserService.create(**params)
        if boo:
            return self.response_success()
        else:
            return self.response_fail(HttpCode.fail, value)

    @parameters(
        id=Check(type=int, null=False),
    )
    def delete(self, params):
        """ 用户删除监测商品 """
        UserService.delete(**params)
        return self.response_success()
