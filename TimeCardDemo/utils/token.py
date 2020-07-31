import time

import jwt


def create_token(user):
    payload = {
        'username': user['username'],
        'id': user['id'],
        'iat': int(time.time()),
        'exp': int(time.time()) + 3600  # expires in 60s
    }
    # secret自己设定，加密字符串，放在服务器
    token = jwt.encode(payload, 'secret', algorithm='HS256')
    return token


def verify_token(token):
    try:
        payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        # decode成payload，用payload和当前时间戳重新生成一个token并返回
        token = create_token(payload)
        return token
    except:
        return False
