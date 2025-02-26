import grpc
from protos import user_pb2_grpc, user_pb2, address_pb2, address_pb2_grpc

def test_create_user(stub):
    try:
        request = user_pb2.CreateUserRequest()
        request.mobile = "1999999999"
        response = stub.CreateUser(request)
        print(response)
    except grpc.RpcError as e:
        print(e.code())
        print(e.details())

def test_get_user_by_id(stub):
    try:
        request = user_pb2.IdRequest()
        request.id = 1893220607349227520
        response = stub.GetUserById(request)
        print(response)
    except grpc.RpcError as e:
        print(e.code())
        print(e.details())

def test_get_user_by_mobile(stub):
    try:
        request = user_pb2.MobileRequest()
        request.mobile = "1999999999"
        response = stub.GetUserByMobile(request)
        print(response)
    except grpc.RpcError as e:
        print(e.code())
        print(e.details())

def test_update_avatar(stub):
    request = user_pb2.AvatarRequest()
    request.id = 1893220607349227520
    request.avatar = "https://www.zlkt.net/xxyy.jpg"
    response = stub.UpdateAvatar(request)
    print(response)

def test_update_username(stub):
    request = user_pb2.UsernameRequest()
    request.id = 1893220607349227520
    request.username = "hahaha"
    response = stub.UpdateUsername(request)
    print(response)

def test_update_password(stub):
    request = user_pb2.PasswordRequest()
    request.id = 1893220607349227520
    request.password = "111111"
    response = stub.UpdatePassword(request)
    print(response)

def test_verify_user(stub):
    request = user_pb2.VerifyUserRequest()
    request.mobile = "1999999999"
    request.password = "111111"
    response = stub.VerifyUser(request)
    print(response)

def test_get_user_list(stub):
    request = user_pb2.PageRequest()
    request.page = 1
    request.size = 1
    response = stub.GetUserList(request)
    print(response)

def test_get_or_create_user(stub):
    request = user_pb2.MobileRequest()
    request.mobile = "199999999901"
    response = stub.GetOrCreateUserByMobile(request)
    print(response)

def test_create_address(stub):
    request  = address_pb2.CreateAddressRequest(
        user_id = 1893220607349227520,
        realname = '孙悟空',
        mobile = '1999999999',
        region = '北京市',
        detail = '李家'
    )
    response = stub.CreateAddress(request)
    print(response.address)

def main():
    with grpc.insecure_channel('localhost:50051') as channel:
        user_stub = user_pb2_grpc.UserStub(channel)
        # test_create_user(user_stub)
        # test_get_user_by_id(user_stub)
        # test_get_user_by_mobile(user_stub)
        # test_update_avatar(user_stub)
        # test_update_username(user_stub)
        # test_update_password(user_stub)
        # test_verify_user(user_stub)
        # test_get_user_list(user_stub)
        # test_get_or_create_user(user_stub)

        address_sub = address_pb2_grpc.AddressStub(channel)
        test_create_address(address_sub)

if __name__ == '__main__':
    main()