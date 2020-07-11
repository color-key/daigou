# -*- coding: utf-8 -*-
import requests

from test_client import TestApi


class DemoApi(TestApi):
    def demo_test(self):
        url = self.build_url('/demo/test')
        params = dict(username='你好', password='213213')
        headers = dict(token='cc43abb48b41c60aeacb3df9b5f54874')
        rsp = requests.post(url, json=params, headers=headers)
        print(rsp.json())


demo_api = DemoApi()
demo_api.demo_test()
