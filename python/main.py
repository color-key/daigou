# -*- coding: utf-8 -*-
from sanic import Sanic
from apscheduler.schedulers.background import BackgroundScheduler
from sanic_cors import CORS

from config import appdef
from controller.demo.demo_controller import DemoController

app = Sanic('purchase_service')
CORS(app)
scheduler = BackgroundScheduler(timezone="Asia/Shanghai")

appconf = appdef.config()


@app.route('/api/<module>/<action>', methods=['GET', 'POST', 'OPTIONS'], version=1)
async def http_handler(request, module, action):
    print('请求接口：%s/%s' % (module, action))
    process = None
    if module == 'demo':
        process = DemoController
    return process(request, action).process()


@app.listener('after_server_start')
async def notify_server_started(app, loop):
    print('Server successfully started!')


@app.listener('after_server_stop')
async def close_db(app, loop):
    appdef.db_close()


if __name__ == '__main__':
    print("准备启动程序，项目路径：http://%s:%s" % (appconf['app']['host'], appconf['app']['port']))
    app.run(host=appconf['app']['host'], port=appconf['app']['port'])
    print("程序结束，项目路径：http://%s:%s" % (appconf['app']['host'], appconf['app']['port']))
