# -*- coding: utf-8 -*-

import json
import requests


class HttpUtil:

    @staticmethod
    def post_form(url: str, params_dict: dict):
        print(f"准备发送请求,send_url:{url},params_dict:{params_dict}")

        response = requests.post(url=url, data=params_dict)
        return response.text

    @staticmethod
    def post_json(url: str, params_dict: dict):
        response = requests.post(url=url, data=json.dumps(params_dict, ensure_ascii=False).encode(encoding='utf-8'), headers={'Content-Type': 'application/json'})
        return response.text

    @staticmethod
    def get_form(url: str, params_dict: dict):
        print(f"准备发送请求,send_url:{url},params_dict:{params_dict}")

        response = requests.get(url=url, data=params_dict)
        return response.text

    @staticmethod
    def get_url(url: str):
        print(f"准备发送请求,send_url:{url}")

        return requests.get(url=url)

    @staticmethod
    def get_json(url: str, params_dict: dict):
        response = requests.get(url=url, data=json.dumps(params_dict, ensure_ascii=False).encode(encoding='utf-8'), headers={'Content-Type': 'application/json'})
        return response.text
