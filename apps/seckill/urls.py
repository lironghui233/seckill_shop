from django.urls import path
from rest_framework.routers import DefaultRouter
from . import views

# app的名称
app_name = 'seckillshop_admin'

commodity_router = DefaultRouter()
commodity_router.register('commodity', views.CommodityViewSet, basename='commodity')

seckill_router = DefaultRouter()
seckill_router.register('seckill', views.SeckillViewSet, basename='seckill')

urlpatterns = [] + commodity_router.urls + seckill_router.urls