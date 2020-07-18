# -*- coding: utf-8 -*-
from config.app_define import AppDefine
import os

appmode = os.environ.get("MODE", "dev")
# appmode = 'prod'
appdef = AppDefine(appmode)
appdef.db_init()
