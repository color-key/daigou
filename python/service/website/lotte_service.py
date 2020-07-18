# -*- coding: utf-8 -*-
from datetime import datetime
from urllib import parse
from lxml import etree
from libs.http_client.http_util import HttpUtil
from model.product.goods import Goods, ResultCode
from model.product.product_config import WebsiteTypeEnum
from service import BaseService


class LotteService(BaseService):

    root_url = 'https://chn.lottedfs.cn/kr'
    search_url = '/search/tabSearchAjax?'
    detail_url = '/product/productDetail?'

    @classmethod
    def pull_html_data(cls, search_word: str = '雪花秀', brndNo: str = '16394', priceMin: int = 22, priceMax: int = 629, curPageNo: int = 1, listCount: int = 20):
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
            prd_no = href_list[1]
            prd_opt_no = href_list[3]
            brand = div_info_list[1].xpath('string(strong)').strip()
            brand_en = div_info_list[1].xpath('string()').split(brand)[1].strip()
            img_url = div_img.attrib["src"]
            product_name = div_info_list[2].text
            price = div_price.xpath('span')[0].text
            discount = div_price.xpath('strong')[0].text.strip()
            discount_price = div_discount.xpath('strong')[0].text
            product = dict(
                website_type=WebsiteTypeEnum.lottedfs_mobile,
                name=product_name,
                prd_no=prd_no,
                prd_opt_no=prd_opt_no,
                brand=brand,
                brand_en=brand_en,
                img_url=img_url,
                price=price,
                discount=discount,
                discount_price=discount_price,
            )
            # 保存数据
            cls.save(product)
        # 是否有下一页
        if end_page != str(params['curPageNo']):
            print('has_next')
            cls.pull_html_data(search_word, brndNo, priceMin, priceMax, curPageNo + 1, listCount)
            print('success')

    @classmethod
    def save(cls, product: dict):
        """ 保存数据 """
        # 重复商品，作更新操作
        query_list = Goods.select().where(Goods.website_type == product['website_type'], Goods.prd_no == product['prd_no'], Goods.prd_opt_no == product['prd_opt_no'])
        goods = None
        if query_list:
            goods = query_list[0]
            goods.update_time = datetime.now()
        else:
            goods = Goods()
        goods.website_type = product['website_type']
        goods.name = product['name']
        goods.prd_no = product['prd_no']
        goods.prd_opt_no = product['prd_opt_no']
        goods.brand = product['brand']
        goods.brand_en = product['brand_en']
        goods.img_url = product['img_url']
        goods.price = product['price']
        goods.discount = product['discount']
        goods.discount_price = product['discount_price']
        goods.save()

        print(str(product))

    @classmethod
    def conver_params(cls, search_word: str = '雪花秀', brndNo: str = '16394', priceMin: int = 22, priceMax: int = 629, curPageNo: int = 1, listCount: int = 20) -> dict:
        """ 查询参数设置 """
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
    def pull_html_detail(cls, prdNo: str = '20000724053', prdOptNO: str = '20000892355') -> bool:
        """ 查看商品详情 """
        print('查看商品详情，url:%s, prdNo:%s,prdOptNO:%s' % (cls.root_url + cls.detail_url, prdNo, prdOptNO))
        params = dict(prdNo=prdNo, prdOptNO=prdOptNO)
        response = HttpUtil.get_url(cls.root_url + cls.detail_url + parse.urlencode(params))
        xml_str = response.content.decode('utf-8')
        # 解析数据
        html = etree.HTML(xml_str)
        # 购买按钮 class
        buyBtn_html = html.xpath('//div[contains(@class, "buyBtn")]')
        if buyBtn_html:
            buy_btn_class = html.xpath('//div[contains(@class, "buyBtn")]')[0].attrib['class']
            # 判断能否购买
            if 'soldOut' in buy_btn_class:
                return ResultCode.off_shelf
            return ResultCode.on_shelf
        else:
            err_p = html.xpath('//div[@class="box"]/p')
            if err_p and err_p[0].text == 'Access to the website is blocked.':
                print("查看商品详情，请求错误，错误信息：%s" % err_p[0].text)
                return ResultCode.blocked
            else:
                return ResultCode.error
