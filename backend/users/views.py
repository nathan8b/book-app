from rest_framework import viewsets
from rest_framework.response import Response
from .models import Profile, ShelfEntry
from .serializers import ProfileSerializer, ShelfEntrySerializer

class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

class ShelfEntryViewSet(viewsets.ModelViewSet):
    queryset = ShelfEntry.objects.all()
    serializer_class = ShelfEntrySerializer
