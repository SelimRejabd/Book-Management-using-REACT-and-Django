from django.db import models

class Book(models.Model):
    id =models.AutoField(primary_key=True, editable=False)
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    isbn = models.CharField(max_length=13)
    book_image = models.ImageField(upload_to='')

    def __str__(self):
        return self.title
