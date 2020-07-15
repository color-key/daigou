# -*- coding: utf-8 -*-
from peewee import MySQLDatabase
from redis import ConnectionPool, StrictRedis


class AppDefine(object):
    db_purchase = None
    db_redis = None

    app = dict(
        dev=dict(
            host='0.0.0.0',
            port='9090'
        ),
        prod=dict(
            host='0.0.0.0',
            port='9090'
        )
    )

    mysql = dict(
        dev=[
            dict(
                name='daigou',
                host='127.0.0.1',
                port=3306,
                user='root',
                password='123456'
            )
        ],
        # dev=[
        #     dict(
        #         name='daigou',
        #         host='121.36.218.101',
        #         port=3306,
        #         user='root',
        #         password='Mysql@8848'
        #     )
        # ],
        prod=[
            dict(
                name='daigou',
                host='121.36.218.101',
                port=3306,
                user='root',
                password='Mysql@8848'
            )
        ]
    )

    redis = dict(
        dev=dict(
            host='127.0.0.1',
            port=6379,
            db=0,
            password=''
        ),
        prod=dict(
            host='localhost',
            port=6379,
            db=0,
            password=''
        )
    )

    def __init__(self, mode='dev'):
        self.mode = mode

    def config(self):
        config = dict(
            app=self.app[self.mode],
            mysql=self.mysql[self.mode],
            redis=self.redis[self.mode]
        )
        return config

    def db_init(self):
        # mysql init
        mysql_conf = self.config()['mysql'][0]
        self.db_purchase = MySQLDatabase(mysql_conf['name'], user=mysql_conf['user'], password=mysql_conf['password'], host=mysql_conf['host'], port=mysql_conf['port'], autoconnect=True)

        # redis init
        redis_conf = self.config()['redis']
        pool = ConnectionPool(host=redis_conf['host'], port=redis_conf['port'], db=redis_conf['db'], password=redis_conf['password'], decode_responses=True)
        self.db_redis = StrictRedis(connection_pool=pool)

    def db_close(self):
        self.db_purchase.close()
        # self.db_redis.connection_pool.disconnect()
