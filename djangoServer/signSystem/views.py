from django.shortcuts import render
# Create your views here.

import json
import requests

from django.http import HttpResponse
from django.http import JsonResponse
from django.http import HttpRequest

from djangoServer import settings
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import User,Activity,Act2Stu

def index(request):
    return HttpResponse("签到系统首页")


def uploadcode(request):
    return HttpResponse("uploadcode")


def userAlreadyExist(request):
    usernumber = request.GET.get('usernumber')
    print(usernumber)
    try:
        user = User.objects.get(u_number=usernumber)
    except Exception:
        return JsonResponse({'message': 'success', 'code': '0'})
    return JsonResponse({'message': '用户已经存在', 'code': '-1'})
        

def register(request):
    code = request.GET.get('code')
    encryptedData = request.GET.get('encryptedData')
    iv = request.GET.get('iv')
    usernumber = request.GET.get('usernumber')
    username = request.GET.get('username')
    password = request.GET.get('password')
    usergender = request.GET.get('usergender')
    userclass = request.GET.get('userclass')
    usermajor = request.GET.get('usermajor')
    useremail = request.GET.get('useremail')
    userprivilege = 0
    
    if not code:
        return JsonResponse({'message': 'code is null', 'code': '-1'})

    url = "https://api.weixin.qq.com/sns/jscode2session?appid={0}&secret={1}&js_code={2}&grant_type=authorization_code" \
        .format(settings.APP_ID, settings.APP_KEY, code)

    r = requests.get(url)
    res = json.loads(r.text)
    openid = res['openid'] if 'openid' in res else None
    session_key = res['session_key'] if 'session_key' in res else None
    
    if not openid:
        return JsonResponse({'message': 'server request openid fail!', 'code': '-1'})
    
    try:
        user = User.objects.get(u_number=usernumber)
    except Exception:
        user = User.objects.create(u_number=usernumber, u_gender=usergender, u_name=username,u_class=userclass, u_major=usermajor, u_email=useremail,u_privilege=userprivilege, u_openid=openid,u_password=password)
        return JsonResponse({'message': 'success', 'code': '0'})
    return JsonResponse({'message': '用户已经存在', 'code': '-1'})


def login(request):
    # 前端发送code到后端, 后端发送网络请求到微信服务器换取openid
    code = request.GET.get('code')
    encryptedData = request.GET.get('encryptedData')
    iv = request.GET.get('iv')
    usernumber = request.GET.get('usernumber')
    password = request.GET.get('password')

    if not code:
        return JsonResponse({'message': 'code is null','code': '-1'})

    url = "https://api.weixin.qq.com/sns/jscode2session?appid={0}&secret={1}&js_code={2}&grant_type=authorization_code" \
        .format(settings.APP_ID, settings.APP_KEY, code)

    r = requests.get(url)
    res = json.loads(r.text)
    openid = res['openid'] if 'openid' in res else None
    session_key = res['session_key'] if 'session_key' in res else None
    
    if not openid:
        return JsonResponse({'message': 'server request openid fail!','code': '-1'})

    try:
        user = User.objects.get(u_number=usernumber)
    except Exception:
        return JsonResponse({'message': '用户名或密码错误','code': '-1'})
    
    if user.u_password != password:
        return JsonResponse({'message': '用户名或密码错误','code': '-1'})

    resp_data = {
           "usernumber": user.u_number,
           "username": user.u_name,
           "usergender": user.u_gender,
           "userclass": user.u_class,
           "usermajor": user.u_major,
           "useremail": user.u_email,   
           "userprivilege": user.u_privilege,
           "message": "success",
            "code": 0
    }
    return JsonResponse(resp_data)


    '''
        # 微信用户第一次登陆,新建用户
        username = res['nickname']
        sex = res['sex']
        avatar = res['avatar']
        #user = User.objects.create(username=username, sex=sex, avatar=avatar)
        #user.set_password(openid)
    
    # 手动签发jwt
    jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
    jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
    payload = jwt_payload_handler(user)
    token = jwt_encode_handler(payload)
    
    encryptedData 解密后:
    {
        "openId": "OPENID",
        "nickName": "NICKNAME",
        "gender": GENDER,
        "city": "CITY",
        "province": "PROVINCE",
        "country": "COUNTRY",
        "avatarUrl": "AVATARURL",
        "unionId": "UNIONID",
        "watermark":
        {
            "appid":"APPID",
            "timestamp":TIMESTAMP
        }
    }
    '''


