from django.urls import path
from .views import (
    EmployeeCreateView, EmployeeListView, EmployeeDetailView, 
    EmployeeDisableView, InactiveEmployeeListView, EmployeeRestoreView
)

urlpatterns = [
    path('create/', EmployeeCreateView.as_view(), name='employee-create'),
    path('list/', EmployeeListView.as_view(), name='employee-list'),
    path('inactive/', InactiveEmployeeListView.as_view(), name='employee-inactive-list'),
    path('<int:pk>/', EmployeeDetailView.as_view(), name='employee-detail'),
    path('<int:pk>/disable/', EmployeeDisableView.as_view(), name='employee-disable'),
    path('<int:pk>/restore/', EmployeeRestoreView.as_view(), name='employee-restore'),
]
