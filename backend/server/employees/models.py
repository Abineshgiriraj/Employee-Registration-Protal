from django.db import models

# Create your models here.
from accounts.models import User

class Employee(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    employee_id = models.CharField(max_length=20, unique=True)
    full_name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=15)

    department = models.CharField(max_length=100)
    designation = models.CharField(max_length=100)

    date_of_joining = models.DateField()
    salary = models.DecimalField(max_digits=10, decimal_places=2)

    gender = models.CharField(max_length=10)
    employment_type = models.CharField(max_length=20)

    address = models.TextField()

    is_active = models.BooleanField(default=True)  # Soft delete
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.full_name
