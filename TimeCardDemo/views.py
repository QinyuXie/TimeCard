from django.contrib.auth.hashers import make_password, check_password
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.utils import json
from rest_framework.viewsets import ModelViewSet

from .models import Employee, TimeEntry
from .serializers import EmployeeSerializer, TimeEntrySerializer
from .utils.token import create_token, verify_token


class EmployeeViewSet(ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer

    @action(detail=False, methods=['post'])
    def register(self, request):
        data = json.loads(request.body)
        # validate register username
        exist_employee = Employee.objects.filter(username=data['username'])
        if len(exist_employee):
            res = {
                'success': False,
                'mess': 'Username has been used'
            }
            return Response(res)
        else:
            data['password'] = make_password(data['password'])
            Employee.objects.create(**data)
            res = {
                'success': True
            }
            return Response(res)

    @action(detail=False, methods=['post'])
    def login(self, request):
        data = json.loads(request.body)
        filter_user = Employee.objects.filter(username=data['username'])
        if not len(filter_user):
            res = {
                'success': False,
                'mess': 'Username do not exist'
            }
            return Response(res)

        user = EmployeeSerializer(filter_user, many=True).data[0]
        check_pass_result = check_password(data['password'], user['password'])
        if not check_pass_result:
            res = {
                'success': False,
                'mess': 'Password do not match with username'
            }
            return Response(res)

        employee_view = {
            'id': user['id'],
            'username': user['username'],
            'first_name': user['first_name'],
            'last_name': user['last_name'],
            'email': user['email'],
            'phone': user['phone']
        }
        res = {
            'success': True,
            'data': employee_view
        }
        # 密码校验之后生成token并添加到headers
        response = Response(res)
        response['Access-Control-Expose-Headers'] = 'auth'
        response['auth'] = create_token(user)
        return response


class TimeEntryViewSet(ModelViewSet):
    queryset = TimeEntry.objects.all()
    serializer_class = TimeEntrySerializer

    @action(detail=True, methods=['get'])
    def all_entry(self, request, pk=None):
        # 先做登录校验，从headers拿token，如果没有HTTP_AUTH会进入except
        try:
            token = request.META.get('HTTP_AUTH')  # 从request的headers里获取token
            # print(token)
            token = verify_token(token)  # 校验并生成新的token，如果校验失败，返回false
            # print(token)
            if not token:
                res = {
                    'success': False,
                    'mess': '请重新登录'
                }
                return Response(res)

            entry_set = TimeEntry.objects.filter(employee_id=pk)
            entry_list = TimeEntrySerializer(entry_set, many=True).data
            res = {
                'success': True,
                'data': entry_list
            }
            response = Response(res)
            # response['Access-Control-Expose-Headers'] = 'auth'
            # response['auth'] = token
            return response
        except:
            res = {
                'success': False,
                'mess': '请登录'
            }
            return Response(res)
