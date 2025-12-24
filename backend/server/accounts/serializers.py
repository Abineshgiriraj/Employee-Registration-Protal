from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import User

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        # Include role and is_staff in token response for frontend
        data['is_staff'] = self.user.is_staff
        data['role'] = self.user.role
        # Ensure is_staff is True if user has ADMIN role (for backward compatibility)
        if self.user.role == 'ADMIN' and not self.user.is_staff:
            self.user.is_staff = True
            self.user.save()
        return data

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'role']

    def create(self, validated_data):
        role = validated_data.get('role', 'USER')
        user = User(
            username=validated_data['username'],
            email=validated_data['email'],
            role=role
        )
        # Set is_staff=True for admin users to ensure proper permission handling
        if role == 'ADMIN':
            user.is_staff = True
        user.set_password(validated_data['password'])
        user.save()
        return user
