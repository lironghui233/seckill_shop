# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models
from utils.snowflake import snowflake
from datetime import datetime

id_worker = snowflake.Snowflake(0,0)

def generate_id():
    return id_worker.get_id()

class Commodity(models.Model):
    title = models.CharField(max_length=200, blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    covers = models.JSONField(blank=True, null=True)
    detail = models.TextField(blank=True, null=True)
    create_time = models.DateTimeField(blank=True, null=True, default=datetime.now)
    id = models.BigAutoField(primary_key=True, default=generate_id)

    class Meta:
        managed = False
        db_table = 'commodity'


class Order(models.Model):
    create_time = models.DateTimeField(blank=True, null=True, default=datetime.now)
    status = models.CharField(max_length=9, blank=True, null=True)
    count = models.IntegerField(blank=True, null=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    alipay_trade_no = models.CharField(max_length=200, blank=True, null=True)
    user_id = models.BigIntegerField(blank=True, null=True)
    address = models.CharField(max_length=500, blank=True, null=True)
    seckill = models.ForeignKey('Seckill', models.DO_NOTHING, blank=True, null=True)
    id = models.BigAutoField(primary_key=True, default=generate_id)

    class Meta:
        managed = False
        db_table = 'order'


class Seckill(models.Model):
    sk_price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True, db_comment='秒杀价')
    start_time = models.DateTimeField(blank=True, null=True, db_comment='秒杀开始时间')
    end_time = models.DateTimeField(blank=True, null=True, db_comment='秒杀结束时间')
    create_time = models.DateTimeField(blank=True, null=True, default=datetime.now)
    max_sk_count = models.IntegerField(blank=True, null=True, db_comment='秒杀数量')
    stock = models.IntegerField(blank=True, null=True, db_comment='库存量')
    sk_per_max_count = models.IntegerField(blank=True, null=True, db_comment='每人最多秒杀数量')
    commodity = models.ForeignKey(Commodity, models.DO_NOTHING, blank=True, null=True)
    version_id = models.CharField(max_length=100)
    id = models.BigAutoField(primary_key=True, default=generate_id)

    class Meta:
        managed = False
        db_table = 'seckill'
