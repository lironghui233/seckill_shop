from protos import address_pb2, address_pb2_grpc
from sqlalchemy import select, update, delete
from models.address import Address
import grpc
from google.protobuf import empty_pb2


class AddressServicer(address_pb2_grpc.AddressServicer):
    async def CreateAddress(self, request: address_pb2.CreateAddressRequest, context, session):
        async with session.begin():
            user_id = request.user_id
            realname = request.realname
            mobile = request.mobile
            region = request.region
            detail = request.detail
            try:
                address = Address(
                    realname=realname,
                    mobile=mobile,
                    region=region,
                    detail=detail,
                    user_id=user_id
                )
                session.add(address)
            except Exception as e:
                context.set_code(grpc.StatusCode.NOT_FOUND)
                context.set_details('用户不存在！')
        response = address_pb2.AddressResponse(address=address.to_dict())
        return response

    async def UpdateAddress(self, request: address_pb2.UpdateAddressRequest, context, session):
        async with session.begin():
            id = request.id
            realname = request.realname
            mobile = request.mobile
            region = request.region
            detail = request.detail
            user_id = request.user_id
            result = await session.execute(update(Address).where(
                Address.id==id, Address.user_id==user_id
            ).values(
                realname=realname,
                mobile=mobile,
                region=region,
                detail=detail
            ))
            rowcount = result.rowcount
            if rowcount == 0:
                context.set_code(grpc.StatusCode.NOT_FOUND)
                context.set_details('地址不存在！')
        return empty_pb2.Empty()

    async def DeleteAddress(self, request: address_pb2.DeleteAddressRequest, context, session):
        async with session.begin():
            id = request.id
            user_id = request.user_id
            result = await session.execute(delete(Address).where(Address.id==id, Address.user_id==user_id))
            if result.rowcount == 0:
                context.set_code(grpc.StatusCode.NOT_FOUND)
                context.set_details('地址不存在！')
        return empty_pb2.Empty()

    async def GetAddressById(self, request: address_pb2.AddressIdRequest, context, session):
        async with session.begin():
            id = request.id
            result = await session.execute(select(Address).where(Address.id == id))
            address = result.scalar()
        return address_pb2.AddressResponse(address=address.to_dict())

    async def GetAddressList(self, request: address_pb2.AddressListRequest, context, session):
        async with session.begin():
            user_id = request.user_id
            page = request.page
            size = request.size
            offset = (page-1)*size
            result = await session.execute(select(Address).where(Address.user_id==user_id).limit(size).offset(offset))
            rows = result.scalars()
        addresses = []
        for row in rows:
            addresses.append(row.to_dict())
        return address_pb2.AddressListResponse(addresses=addresses)