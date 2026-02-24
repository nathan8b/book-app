from rest_framework import serializers
from .models import Profile, ShelfEntry

class ShelfEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = ShelfEntry
        fields = '__all__'

class ProfileSerializer(serializers.ModelSerializer):
    shelf = ShelfEntrySerializer(many=True, read_only=True)
    class Meta:
        model = Profile
        fields = '__all__'


