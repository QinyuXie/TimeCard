from django.conf.urls import url
from django.urls import include
from rest_framework.routers import DefaultRouter

from . import views

# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'employees', views.EmployeeViewSet, basename='employees')
router.register(r'time_entry', views.TimeEntryViewSet)

urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^drf-auth/', include('rest_framework.urls'))
]
