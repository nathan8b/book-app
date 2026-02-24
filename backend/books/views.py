from rest_framework import viewsets
from .models import Book
from .serializers import BookSerializer
from rest_framework.response import Response

# Create your views here.
class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

    def create (self, request, *args, **kwargs):
        data = request.data
        obj, created = Book.objects.get_or_create(
            isbn = data['isbn'],
            defaults={'title': data['title'],
                      'author': data['author'],
                      'description': data['description'],
                      'pub_date': data['pub_date']}
        )
        return Response(BookSerializer(obj).data)