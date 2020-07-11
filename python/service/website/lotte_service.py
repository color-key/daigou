# -*- coding: utf-8 -*-
from urllib import parse

from lxml import etree

from libs.http_client.http_util import HttpUtil
from service import BaseService


class LotteService(BaseService):

    root_url = 'https://chn.lottedfs.cn/kr'
    search_url = '/search/tabSearchAjax?'
    detail_url = '/product/productDetail?'
    aa = 'https://chn.lottedfs.cn/kr/product/productDetail?prdNo=20000726230&prdOptNo=20000897126'

    @classmethod
    def get_search_html(cls, search_word: str = '雪花秀', brndNo: str = '16394', priceMin: int = 22, priceMax: int = 629, curPageNo: int = 1, listCount: int = 20):
        """ 请求数据，有下一页递归 """
        params = cls.conver_params(search_word, brndNo, priceMin, priceMax, curPageNo, listCount)
        response = HttpUtil.get_url(cls.root_url + cls.search_url + parse.urlencode(params))
        xml_str = response.content.decode('utf-8')
        # 解析数据
        html = etree.HTML(xml_str)
        # 最后一页
        end_page = html.xpath('//div[@class="pagingArea"]/div/a[last()]')[0].text

        # 解析单页数据
        for li in html.xpath('//div[@class="imgType"]/ul/li'):
            label_a = li.xpath('a')[0]
            div_img = label_a.xpath('div[@class="img"]/img')[0]
            div_info_list = label_a.xpath('div[@class="info"]/div')
            div_price = label_a.xpath('div[@class="price"]')[0]
            div_discount = label_a.xpath('div[@class="discount"]')[0]

            href_list = label_a.attrib['href'].split('\'')
            prdNo = href_list[1]
            prdOptNO = href_list[3]
            brand = div_info_list[1].xpath('string(strong)').strip()
            brand_en = div_info_list[1].xpath('string()').split(brand)[1].strip()
            src = div_img.attrib["src"]
            product_name = div_info_list[2].text
            price = div_price.xpath('span')[0].text
            discount = div_price.xpath('strong')[0].text.strip()
            discount_price = div_discount.xpath('strong')[0].text
            product = dict(
                prdNo=prdNo,
                prdOptNO=prdOptNO,
                brand=brand,
                brand_en=brand_en,
                img_src=src,
                product_name=product_name,
                price=price,
                discount=discount,
                discount_price=discount_price,
            )
            # 保存数据
            cls.save(product)
        # 是否有下一页
        if end_page != str(params['curPageNo']):
            print('has_next')
            cls.get_search_html(search_word, brndNo, priceMin, priceMax, curPageNo + 1, listCount)
        print('success')

    @classmethod
    def save(cls, product: dict):
        """ 保存数据 """
        print(str(product))

    @classmethod
    def conver_params(cls, search_word: str = '雪花秀', brndNo: str = '16394', priceMin: int = 22, priceMax: int = 629, curPageNo: int = 1, listCount: int = 20) -> dict:
        startCount = listCount * (curPageNo - 1)
        params_dict = dict(
            searchWord=search_word,
            curPageNo=curPageNo,
            startCount=startCount,
            listCount=listCount,
            brndNo=brndNo,
            priceMin=priceMin,
            priceMax=priceMax,
            collection='GOODS',
            returnUrl='searchTabPrdList',
            sort='DATE/DESC',
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
            prdOptItemCD='',
            flteCD='',
            eventCd='',
            spell_YN='',
        )
        return params_dict

    @classmethod
    def get_detail_html(cls, prdNo: str = '20000724053', prdOptNO: str = '20000892355'):
        """ 查看商品详情 """
        params = dict(prdNo=prdNo, prdOptNO=prdOptNO)
        response = HttpUtil.get_url(cls.root_url + cls.detail_url + parse.urlencode(params))
        xml_str = response.content.decode('utf-8')
        # 解析数据
        html = etree.HTML(xml_str)
        # 购买按钮 class
        buy_btn_class = html.xpath('//div[contains(@class, "buyBtn")]')[0].attrib['class']
        # 判断能否购买
        if 'soldOut' in buy_btn_class:
            print('faild')
        else:
            print('success')


# LotteService.get_search_html()
LotteService.get_detail_html()
