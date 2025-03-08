from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from datetime import datetime
import json
from django.core.cache import cache

from apps.seckill.models import Commodity, Seckill
from apps.seckill.serializers import CommoditySerializer, SeckillSerializer


class CommodityViewSet(ModelViewSet):
    queryset = Commodity.objects.all()
    serializer_class = CommoditySerializer

class SeckillViewSet(ModelViewSet):
    queryset = Seckill.objects.all()
    serializer_class = SeckillSerializer

    SECKILL_KEY = "seckill_{seckill_id}"

    # 重写 ModelViewSet->mixins.CreateModelMixin的perform_create方法。
    # 因为这里业务不仅仅要保存到数据库，还要保存到缓存
    def perform_create(self, serializer):
        # 1. 保存到数据库
        serializer.save()
        instance = serializer.instance
        # 2. 保存到缓存
        ex = int((instance.end_time - datetime.now()).total_seconds())
        data = json.dumps(self.serializer_class(instance).data)
        key = self.SECKILL_KEY.format(seckill_id=instance.id)
        cache.set(key, data, timeout=ex)

    # 重写 ModelViewSet->mixins.RetrieveModelMixin的retrieve方法。
    # 因为这里业务不仅仅不是默认形式（从数据库加载），改成先从缓存加载，如果找不到从数据库加载
    def retrieve(self, request, *args, **kwargs):
        # 1. 先从缓存中查找
        pk = self.kwargs.get('pk')
        key = self.SECKILL_KEY.format(seckill_id=pk)
        value = cache.get(key)
        if value:
            return value
        # 2. 再从数据库中查找
        return super().retrieve(request, *args, **kwargs)

    # 重写 ModelViewSet->mixins.UpdateModelMixin的perform_update方法。
    # 因为这里业务不是默认形式（直接提交修改到数据库），而是先提交修改到数据库，然后提交修改到缓存
    def perform_update(self, serializer):
        # 1. 更新数据库
        super().perform_update(serializer)
        # 2. 更新缓存
        instance = serializer.instance
        if instance.end_time > datetime.now():
            ex = int((instance.end_time - datetime.now()).total_seconds())
            data = json.dumps(self.serializer_class(instance).data)
            key = self.SECKILL_KEY.format(seckill_id=instance.id)
            cache.set(key, data, timeout=ex)

    # 重写 ModelViewSet->mixins.DestroyModelMixin的perform_destroy方法。
    # 因为这里业务不是默认形式（直接提交修改到数据库），而是先提交修改到数据库，然后提交修改到缓存
    def perform_destroy(self, instance):
        # 1. 从数据库中删除
        super().perform_destroy(instance)
        # 2. 从缓存中删除
        key = self.SECKILL_KEY.format(seckill_id=instance.id)
        cache.delete(key)
