from rest_framework.serializers import ModelSerializer, CharField
from .models import Commodity, Seckill


class CommoditySerializer(ModelSerializer):
    class Meta:
        model = Commodity
        fields = '__all__'
        extra_kwargs = {
            'create_time': {'read_only': True},
            'id': {'read_only': True},
        }


class SeckillSerializer(ModelSerializer):
    commodity = CommoditySerializer(read_only=True)
    commodity_id = CharField(write_only=True)
    class Meta:
        model = Seckill
        # fields：要处理哪些字段
        # exclude：要排除除处理哪些字段
        exclude = ('version_id',)
        extra_kwargs = {
            'create_time': {'read_only': True},
            "id": {"read_only": True},
        }