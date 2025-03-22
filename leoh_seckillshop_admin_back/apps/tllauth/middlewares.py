from django.utils.deprecation import MiddlewareMixin
from rest_framework.authentication import get_authorization_header
from rest_framework import exceptions
import jwt
from django.conf import settings
from django.http.response import JsonResponse
from rest_framework import status
from django.contrib.auth.models import AnonymousUser
from django.shortcuts import reverse


# 检查是否已经登录的中间件
class LoginCheckMiddleware(MiddlewareMixin):
    keyword = 'Bearer'

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # 对于那些不需要登录就能访问的接口，可以写在这里
        self.white_list = [reverse("health")]

    def process_view(self, request, view_func, view_args, view_kwargs):
        # 说明：
        # 1. 如果返回None，那么会正常执行（包括执行视图，执行其他中间件的代码）
        # 2. 如果返回一个HttpResponse对象，那么将不会执行视图，以及后面的中间件代码（即拦截视图了）

        # 如果在白名单，不需要登录，返回Node，执行视图
        if request.path in self.white_list:
            # 此处的 request 是 django.http.request.HttpRequest 对象
            request.user = AnonymousUser()
            request.auth = None
            return None

        # 检查用户是否已经登录
        try:
            auth = get_authorization_header(request).split()

            if not auth or auth[0].lower() != self.keyword.lower().encode():
                raise exceptions.ValidationError('请传入JWT！')

            if len(auth) == 1:
                msg = '没有提供JWT token！'
                raise exceptions.AuthenticationFailed(msg)
            elif len(auth) > 2:
                msg = '无效JWT!'
                raise exceptions.AuthenticationFailed(msg)

            try:
                # 解密的算法和key必须和加密的算法保持一致
                jwt_token = auth[1]
                payload = jwt.decode(jwt_token, settings.JWT_SECRET_KEY, algorithms=["HS256"])
                userid = payload.get("iss")
                print("userid:", userid)
                setattr(request, "userid", userid)
            except UnicodeError:
                msg = 'UnicodeError'
                raise exceptions.AuthenticationFailed(msg)
            except jwt.ExpiredSignatureError:
                msg = 'token已过期！'
                raise exceptions.AuthenticationFailed(msg)
        except Exception as e:
            # 需要登录才能访问视图， 因此返回一个HttpResponse对象，那么将不会执行视图
            print(e)
            return JsonResponse(data={"detail":"请先登录！"}, status=status.HTTP_403_FORBIDDEN)