from rest_framework import serializers
from .models import Book
from users.serializers import ShelfEntrySerializer

class BookSerializer(serializers.ModelSerializer):
    shelf_entries = ShelfEntrySerializer(many=True, read_only=True)
    class Meta:
        model = Book
        fields = '__all__'
