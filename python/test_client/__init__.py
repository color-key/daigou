# -*- coding: utf-8 -*-


class TestApi:
    def __init__(self):
        self.base_url = 'http://127.0.0.1:9090/v1/api'
        self.token = '71110c39765599607e92dccc2b539d06'

    def build_url(self, path: str) -> str:
        return self.base_url + path
