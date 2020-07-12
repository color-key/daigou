# -*- coding: utf-8 -*-
from sanic import Sanic
from apscheduler.schedulers.background import BackgroundScheduler
from sanic_cors import CORS

from config import appdef, appmode
from controller.demo.demo_controller import DemoController
from controller.product.product_config_controller import ProductConfigController
from task.task import Task

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
    if module == 'product_config':
        process = ProductConfigController
    return process(request, action).process()


@app.listener('after_server_start')
async def notify_server_started(app, loop):
    print('Server successfully started!')


@app.listener('after_server_stop')
async def close_db(app, loop):
    appdef.db_close()


# 每1分钟执行一次，更新查询商品详情
# scheduler.add_job(Task.run_task_search_goods_detail, 'interval', seconds=60)
# 每天 00:00:30 执行一次，更新商品库
# scheduler.add_job(Task.run_task_update_goods,  'cron', hour=0, minute=30)
scheduler.add_job(Task.run_task_update_goods,  'interval', seconds=20)


if __name__ == '__main__':
    # if appmode != 'dev':
    #     scheduler.start()
    scheduler.start()

    print("准备启动程序，项目路径：http://%s:%s" % (appconf['app']['host'], appconf['app']['port']))
    app.run(host=appconf['app']['host'], port=appconf['app']['port'])
    print("程序结束，项目路径：http://%s:%s" % (appconf['app']['host'], appconf['app']['port']))
