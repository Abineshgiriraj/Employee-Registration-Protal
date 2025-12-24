from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .serializers import EmployeeSerializer
from .models import Employee

def is_admin_user(user):
    """Check if user is admin based on role field or is_staff/is_superuser"""
    return user.role == 'ADMIN' or user.is_staff or user.is_superuser

class EmployeeCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # Allow admin to create employees (for admin dashboard registration)
        # Regular users can also create their own employee records
        serializer = EmployeeSerializer(data=request.data)
        if serializer.is_valid():
            # If admin is creating, we don't associate with a user (or use a system user)
            # For now, we'll allow admin to create without user association
            # Regular users create their own records
            if is_admin_user(request.user):
                # Admin creating employee - save without user association or use admin as user
                serializer.save(user=request.user)
            else:
                serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class EmployeeListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Admin sees all active employees, regular users see only their own active employees
        if is_admin_user(request.user):
            employees = Employee.objects.filter(is_active=True)
        else:
            employees = Employee.objects.filter(user=request.user, is_active=True)
        serializer = EmployeeSerializer(employees, many=True)
        return Response(serializer.data)

class EmployeeDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, pk, user):
        try:
            # Admins can access any employee (active or inactive), users can only access their own active employees
            if is_admin_user(user):
                employee = Employee.objects.get(pk=pk)
            else:
                employee = Employee.objects.get(pk=pk, is_active=True)
                # Check if employee belongs to user
                if employee.user != user:
                    return None
            return employee
        except Employee.DoesNotExist:
            return None

    def get(self, request, pk):
        employee = self.get_object(pk, request.user)
        if not employee:
            return Response({"detail": "Employee not found or access denied."}, status=status.HTTP_404_NOT_FOUND)
        serializer = EmployeeSerializer(employee)
        return Response(serializer.data)

    def put(self, request, pk):
        employee = self.get_object(pk, request.user)
        if not employee:
            return Response({"detail": "Employee not found or access denied."}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = EmployeeSerializer(employee, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        """Soft delete: Set is_active=False instead of hard delete"""
        employee = self.get_object(pk, request.user)
        if not employee:
            return Response({"detail": "Employee not found or access denied."}, status=status.HTTP_404_NOT_FOUND)
        
        # Soft delete: set is_active to False
        employee.is_active = False
        employee.save()
        return Response({"detail": "Employee soft deleted successfully."}, status=status.HTTP_200_OK)

    def patch(self, request, pk):
        """Handle PATCH requests - used for soft delete via disable endpoint"""
        employee = self.get_object(pk, request.user)
        if not employee:
            return Response({"detail": "Employee not found or access denied."}, status=status.HTTP_404_NOT_FOUND)
        
        # Check if this is a disable request
        if request.data.get('action') == 'disable' or 'is_active' in request.data:
            employee.is_active = False
            employee.save()
            return Response({"detail": "Employee soft deleted successfully."}, status=status.HTTP_200_OK)
        
        # Otherwise, treat as regular update
        serializer = EmployeeSerializer(employee, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EmployeeDisableView(APIView):
    """Dedicated endpoint for soft delete (disable)"""
    permission_classes = [IsAuthenticated]

    def patch(self, request, pk):
        try:
            if is_admin_user(request.user):
                employee = Employee.objects.get(pk=pk)
            else:
                employee = Employee.objects.get(pk=pk, user=request.user, is_active=True)
            
            employee.is_active = False
            employee.save()
            return Response({"detail": "Employee soft deleted successfully."}, status=status.HTTP_200_OK)
        except Employee.DoesNotExist:
            return Response({"detail": "Employee not found or access denied."}, status=status.HTTP_404_NOT_FOUND)
