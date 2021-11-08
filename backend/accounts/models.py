from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    nationality = models.CharField(max_length=30, blank=True, null=True)

class Details(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    nationality = models.CharField(max_length=30, blank=True, null=True)
    date_of_birth = models.DateTimeField(blank=True, null=True)
    # languages = models.CharField(max_length=30) list
    watched_time_movies = models.PositiveIntegerField(default=0)
    watched_time_series = models.PositiveIntegerField(default=0)