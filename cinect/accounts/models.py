from django.db import models
from django.contrib.auth.models import User


class UserDetails(models.Model):
    user = models.ForeignKey(
        User, related_name="deatils", on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length=100)
    surname = models.CharField(max_length=100)
    nationality = models.CharField(max_length=100)
    languages = models.CharField(max_length=100)
    watched_time_movies = models.IntegerField(default=0)
    watched_time_series = models.IntegerField(default=0)
    date_of_birth = models.DateTimeField(null=True)