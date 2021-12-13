from django.db.models import fields
from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .models import FriendList, UserDetails
from movieseriescollection.serializers import Base64ImageField
# User Serializer


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')

# Register Serializer


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data['username'], validated_data['email'], validated_data['password'])

        return user

# Login Serializer


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials")


class UserDetailsSerializer(serializers.ModelSerializer):
    date_of_birth = serializers.DateField(format=None, input_formats=None)

    class Meta:
        model = UserDetails
        fields = "__all__"

    def create(self, validated_data):
        return UserDetails.objects.create(**validated_data)


class FriendListSerializer(serializers.ModelSerializer):
    class Meta:
        model = FriendList
        fields = "__all__"

    def create(self, validated_data):
        return FriendList.objects.create(**validated_data)


class AvatarSerializer(serializers.ModelSerializer):
    avatar = Base64ImageField(
        max_length=None, use_url=True,
    )

    class Meta:
        model = UserDetails
        fields = ('avatar',)