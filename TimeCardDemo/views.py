from rest_framework.viewsets import ModelViewSet

from .models import Employee, TimeEntry
from .serializers import EmployeeSerializer, TimeEntrySerializer


class EmployeeViewSet(ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    #
    # def get_serializer_class(self):
    #     # 重写get_serializer_class方法
    #     if self.action == 'list':
    #         return EmployeeSerializer
    #     return CourseDetailSerializer


class TimeEntryViewSet(ModelViewSet):
    queryset = TimeEntry.objects.all()
    serializer_class = TimeEntrySerializer
