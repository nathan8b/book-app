from django.db import models
from django.contrib.auth.models import User
from books.models import Book
from django.core.validators import MinValueValidator, MaxValueValidator

class Profile(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='profile'
    )
    bio = models.TextField(blank=True, null=True)
    pfp = models.ImageField(upload_to='pfps', blank=True, null=True)

class ShelfEntry(models.Model):
    STATUS_CHOICES = {
        'READ': 'Read',
        'WANT': 'Want to read',
        'CURR': 'Currently reading',
    }
    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name='shelf_entries')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='shelf')
    status = models.CharField(max_length=4, choices=STATUS_CHOICES, default='WANT')
    rating = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(1), MaxValueValidator(10)])
    review = models.TextField(blank=True, null=True)
    want_date = models.DateField(auto_now_add=True)
    curr_date = models.DateField(null=True, blank=True)
    read_date = models.DateField(null=True, blank=True)
    review_date = models.DateField(null=True, blank=True)