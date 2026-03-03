from rest_framework import serializers
from .models import Profile, ShelfEntry
from django.contrib.auth.models import User

class DjangoUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'date_joined']

class UserInfoForShelf(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name']

class ProfileInfoForShelf(serializers.ModelSerializer):
    user = UserInfoForShelf(read_only=True)
    class Meta:
        model = Profile
        fields = ['pfp', 'user']

class ShelfEntrySerializer(serializers.ModelSerializer):
    profile = ProfileInfoForShelf(read_only=True)
    class Meta:
        model = ShelfEntry
        fields = '__all__'

class ProfileSerializer(serializers.ModelSerializer):
    shelf = ShelfEntrySerializer(many=True, read_only=True)
    user = DjangoUserSerializer(read_only=True)
    class Meta:
        model = Profile
        fields = '__all__'


