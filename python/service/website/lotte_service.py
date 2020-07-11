# -*- coding: utf-8 -*-
from urllib import parse, request

from libs.http_client.http_util import HttpUtil
from service import BaseService
import json as json_json

class LotteService(BaseService):

    @classmethod
    def get_html(cls):
        search_word = '雪花秀'
        root_url = 'https://chn.lottedfs.cn/kr'
        search_url = '/search/tabSearchAjax'
        param = dict(
            searchWord=search_word,
            collection='GOODS',
            returnUrl='searchTabPrdList',
            startCount=0,
            listCount=20,
            curPageNo=1,
            sort='DATE/DESC',
            priceMin=22,
            priceMax=629,
            prdasListCount=5,
            shopSubTpCd='02',
            requery='',
            rt='',
            tcatCD='',
            mcatCD='',
            scatCD='',
            erpPrdGenVal_YN='',
            hsaleIcon_YN='',
            saleIcon_YN='',
            cpnIcon_YN='',
            svmnIcon_YN='',
            giftIcon_YN='',
            mblSpprcIcon_YN='',
            ltOnlyBrnd_YN='',
            onlOnlySale_YN='',
            dfsOnly_YN='',
            newPrd_YN='',
            bestPrd_YN='',
            bf3hrshpCD='',
            so_YN='',
            cpnAply_YN='',
            brndNo='',
            prdOptItemCD='',
            flteCD='',
            eventCd='',
            spell_YN='',
        )
        # data = bytes(parse.urlencode(param), encoding='utf8')
        # json_json.dumps(param)

        # tem_url = 'https://chn.lottedfs.cn/kr/search/tabSearchAjax?searchWord=%E9%9B%AA%E8%8A%B1%E7%A7%80&collection=GOODS&returnUrl=searchTabPrdList&startCount=0&listCount=20&sort=WEIGHT%2FDESC%2CRANK%2FDESC&requery=&rt=&tcatCD=&mcatCD=&scatCD=&priceMin=22&priceMax=629&erpPrdGenVal_YN=&hsaleIcon_YN=&saleIcon_YN=&cpnIcon_YN=&svmnIcon_YN=&giftIcon_YN=&mblSpprcIcon_YN=&ltOnlyBrnd_YN=&onlOnlySale_YN=&dfsOnly_YN=&newPrd_YN=&bestPrd_YN=&bf3hrshpCD=&so_YN=&cpnAply_YN=&brndNo=&shopSubTpCd=02&prdasListCount=5&prdOptItemCD=&flteCD=&eventCd=&spell_YN=&curPageNo=1'
        response = HttpUtil.get_url(root_url + search_url + '?' + parse.urlencode(param))
        xml_str = response.content.decode('utf-8')
        with open('lotte.html', 'w') as f:
            f.write(xml_str)
        print('success')


LotteService.get_html()
