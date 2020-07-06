import 'antd/lib/button/style/index.less';
import DatePicker from 'antd/lib/date-picker';
import 'antd/lib/date-picker/style/index.less';
import 'antd/lib/input/style/index.less';
import 'antd/lib/tag/style/index.less';
import 'antd/lib/time-picker/style/index.less';
import zh_CN from "antd/lib/locale/zh_CN";
import en_US from "antd/lib/locale/en_US";
import ConfigProvider from "antd/lib/config-provider";
import {getLanguage} from "@/lib/user";
import React from "react";

const locale: any = {
  en_US, zh_CN
};

export const getLocale = () => {
  const language: any = getLanguage();
  return locale[language];
};

export const RangePicker = (props: any) => (
  <ConfigProvider locale={getLocale()}>
    <DatePicker.RangePicker {...props}/>
  </ConfigProvider>
)
