from rest_framework import viewsets
from rest_framework.response import Response
from .models import Profile, ShelfEntry
from .serializers import ProfileSerializer, ShelfEntrySerializer
from django.utils import timezone


class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

class ShelfEntryViewSet(viewsets.ModelViewSet):
    queryset = ShelfEntry.objects.all()
    serializer_class = ShelfEntrySerializer
    

    def update (self, request, *args, **kwargs):
        data = request.data.copy()
        instance = self.get_object()

        if data['status'] == 'CURR':
            data['curr_date'] = timezone.localdate()
        elif data['status'] == 'READ':
            data['read_date'] = timezone.localdate()

        if instance.review == "" and data['review'] != None:
            data['review_date'] = timezone.localdate()

        serializer = ShelfEntrySerializer(instance, data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
        
