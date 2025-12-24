from django.urls import path
from .views import EmployeeCreateView, EmployeeListView, EmployeeDetailView, EmployeeDisableView

urlpatterns = [
    path('create/', EmployeeCreateView.as_view(), name='employee-create'),
    path('list/', EmployeeListView.as_view(), name='employee-list'),
    path('<int:pk>/', EmployeeDetailView.as_view(), name='employee-detail'),
    path('<int:pk>/disable/', EmployeeDisableView.as_view(), name='employee-disable'),
]
