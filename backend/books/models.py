from django.db import models

class Book(models.Model):
    title = models.CharField(max_length=200)
    author = models.CharField(max_length=200)
    isbn = models.CharField(max_length=13, unique=True, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    pub_date = models.DateField(blank=True, null=True)

    def __str__(self):
        return f'{self.title} by {self.author}'
    
class Review(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name='reviews')
    reviewer_name = models.CharField(max_length=100)
    rating = models.IntegerField()
    review_text = models.TextField()
    create_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Review by {self.reviewer_name} for {self.book.title}'
