from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class MovieSeries(models.Model):
    title = models.CharField(max_length=100)
    created_at = models.DateTimeField(null=True, blank=True)
    length = models.IntegerField(default=0)
    rating = models.DecimalField(decimal_places=2, max_digits=7, default=0)
    is_imdb = models.BooleanField(default=False)
    is_movie = models.BooleanField(default=False)
    is_series = models.BooleanField(default=False)
    foreign_id = models.CharField(max_length=100, null=True, blank=True)
    image = models.ImageField(upload_to='images', null=True, blank=True)


class UserMovieSeries(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    movie_series = models.ForeignKey(MovieSeries, on_delete=models.CASCADE)
    watched_at = models.DateTimeField(null=True, blank=True)
    rating = models.DecimalField(decimal_places=2, max_digits=7, default=0)
