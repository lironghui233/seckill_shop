from models import AsyncSessionFactory
from models.seckill import Commodity, Seckill
from datetime import datetime, timedelta
import asyncio
# from utils.cache import tll_redis


async def init_seckill_ed():
    title = '联想ThinkPad T14P 2023 可选2024工程师编程 设计师轻薄本 ibm笔记本电脑 i9-13900H 32G内存 512G固态'
    covers = ['https://img12.360buyimg.com/n1/jfs/t1/88086/28/43013/78611/64e9b26cFd2cf3bce/ef3afd998fa46017.jpg',
              'https://img12.360buyimg.com/n1/jfs/t1/223525/20/19283/102058/6460b156F6a457e67/69c39dab7328f4a7.jpg']
    price = 9999
    detail = '<img src="https://img11.360buyimg.com/cms/jfs/t1/81345/8/21825/132140/64ad0e8fFa68ad575/00ed8092a6b95071.jpg" /><img src="https://img11.360buyimg.com/cms/jfs/t1/211324/26/37468/111470/64ad0e8fF623a675d/e3b920a169f75f88.jpg" />'
    commodity = Commodity(title=title, covers=covers, price=price, detail=detail)

    seckill = Seckill(sk_price=6999, start_time=datetime.now() - timedelta(days=1), end_time=datetime.now(),
                      max_sk_count=10, sk_per_max_count=1, stock=10, commodity=commodity)

    async with AsyncSessionFactory() as session:
        async with session.begin():
            session.add(commodity)
            session.add(seckill)
    print('ed秒杀数据添加成功！')


async def init_seckill_ing():
    title = '茅台（MOUTAI）飞天 53%vol 500ml 贵州茅台酒（带杯）'
    covers = ['https://img13.360buyimg.com/n1/jfs/t1/97097/12/15694/245806/5e7373e6Ec4d1b0ac/9d8c13728cc2544d.jpg',
              'https://img13.360buyimg.com/n1/jfs/t1/249760/32/13845/169919/66835f87F26a10873/da4a057761be16f6.jpg']
    price = 2525
    detail = """
            <div>
				<img src="https://img30.360buyimg.com/sku/jfs/t1/154199/7/27952/160501/6371ed18Eae70f83f/3a3c43b823ddfd19.jpg" alt="">
				<img src="https://img30.360buyimg.com/sku/jfs/t1/102199/7/34595/124717/6371eb5bEa1ce165e/92584583e82cc994.jpg" alt="">
				<img src="https://img30.360buyimg.com/sku/jfs/t1/116251/7/29193/130833/6371eb5cEe14bc797/e2cbeb2d2ece1455.jpg" alt="">
			</div>
			"""
    commodity = Commodity(title=title, covers=covers, price=price, detail=detail)
    seckill = Seckill(sk_price=1499, start_time=datetime.now(), end_time=datetime.now() + timedelta(days=365),
                      max_sk_count=10, sk_per_max_count=1, stock=10, commodity=commodity)

    async with AsyncSessionFactory() as session:
        async with session.begin():
            session.add(commodity)
            session.add(seckill)

    print('ing秒杀数据添加成功！')


# async def init_seckill_ing_redis():
#     title = '茅台（MOUTAI）飞天 53%vol 500ml 贵州茅台酒（带杯）-Redis'
#     covers = ['https://img13.360buyimg.com/n1/jfs/t1/97097/12/15694/245806/5e7373e6Ec4d1b0ac/9d8c13728cc2544d.jpg',
#               'https://img13.360buyimg.com/n1/jfs/t1/249760/32/13845/169919/66835f87F26a10873/da4a057761be16f6.jpg']
#     price = 2525
#     detail = """
#             <div>
# 				<img src="https://img30.360buyimg.com/sku/jfs/t1/154199/7/27952/160501/6371ed18Eae70f83f/3a3c43b823ddfd19.jpg" alt="">
# 				<img src="https://img30.360buyimg.com/sku/jfs/t1/102199/7/34595/124717/6371eb5bEa1ce165e/92584583e82cc994.jpg" alt="">
# 				<img src="https://img30.360buyimg.com/sku/jfs/t1/116251/7/29193/130833/6371eb5cEe14bc797/e2cbeb2d2ece1455.jpg" alt="">
# 			</div>
# 			"""
#     commodity = Commodity(title=title, covers=covers, price=price, detail=detail)
#     seckill = Seckill(sk_price=1499, start_time=datetime.now(), end_time=datetime.now() + timedelta(days=365),
#                       max_sk_count=10, sk_per_max_count=1, stock=10, commodity=commodity)
#     # 1. 将秒杀数据添加到数据库中
#     async with AsyncSessionFactory() as session:
#         async with session.begin():
#             session.add(commodity)
#             session.add(seckill)
#     # 2. 把秒杀数据也要同步到redis
#     await tll_redis.add_seckill(seckill)
#     await tll_redis.init_stock(seckill.id, seckill.stock)
#
#     print('ing秒杀数据添加成功！')


async def init_seckill_will():
    title = 'ae86车模可开门汽车模型摆件合金男孩藤原豆腐店1比24头文字D 大号AE86全白色+豆腐店场景+防尘 轿车'
    covers = ['https://img14.360buyimg.com/n1/jfs/t1/91732/30/42256/99363/65f178bdF9e38d03f/5947bef9087e36e4.jpg',
              'https://img14.360buyimg.com/n1/jfs/t1/200366/26/40486/86334/65f178baFe9560549/3af2c255c62bad39.jpg']
    price = 1999
    detail = '<img src="https://img10.360buyimg.com/imgzone/jfs/t1/234054/1/16233/81713/65f7a07dF63847f28/1f5c0c7e6db00963.jpg" /><img src="https://img10.360buyimg.com/imgzone/jfs/t1/234054/1/16233/81713/65f7a07dF63847f28/1f5c0c7e6db00963.jpg" />'
    commodity = Commodity(title=title, covers=covers, price=price, detail=detail)

    seckill = Seckill(sk_price=899, start_time=datetime.now()+timedelta(days=365), end_time=datetime.now() + timedelta(days=730),
                      max_sk_count=10, sk_per_max_count=1, stock=10, commodity=commodity)

    async with AsyncSessionFactory() as session:
        async with session.begin():
            session.add(commodity)
            session.add(seckill)
    print('will秒杀数据添加成功！')


async def main():
    await init_seckill_ed()
    await init_seckill_ing()
    await init_seckill_will()
    # await init_seckill_ing_redis()

if __name__ == '__main__':
    # https://www.cnblogs.com/james-wangx/p/16111485.html
    # asyncio.run(main())
    loop = asyncio.get_event_loop()
    loop.run_until_complete(main())