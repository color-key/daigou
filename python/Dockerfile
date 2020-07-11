#FROM taoliu/gunicorn3
FROM python:3.7.7
#ENV MODE=prod
ADD . /sanic_temp1

WORKDIR /sanic_temp1

RUN pip3 install --upgrade pip

#RUN pip3 install -r sh/requirements.txt -i http://mirrors.aliyun.com/pypi/simple/ --trusted-host mirrors.aliyun.com
#RUN pip3 install -r sh/requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple --trusted-host pypi.tuna.tsinghua.edu.cn
RUN pip3 install -r requirements.txt -i http://pypi.douban.com/simple/ --trusted-host pypi.douban.com

EXPOSE 9090

CMD ["python", "main.py"]