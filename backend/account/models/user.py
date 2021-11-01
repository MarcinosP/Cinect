from django.contrib.auth.models import AbstractUser
from django.db import models
from django.contrib.sessions.models import Session

# Create your models here.


class User(AbstractUser):
    username = models.CharField(max_length=30, unique=True, blank=True)
    name = models.CharField(max_length=50, blank=True)
    surname = models.CharField(max_length=50, blank=True)
    email = models.CharField(max_length=50, unique=True, blank=True)
    password = models.CharField(max_length=200, blank=True)
    is_logged = models.BooleanField()

class Details(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=30, blank=True, null=True)
    surname = models.CharField(max_length=30, blank=True, null=True)
    nationality = models.CharField(max_length=30, blank=True, null=True)
    date_of_birth = models.CharField(max_length=30, blank=True, null=True)
    sampled_dt = models.DateTimeField(blank=True, null=True)
    # languages = models.CharField(max_length=30) list
    watched_time_movies = models.PositiveIntegerField(default=0)
    watched_time_series = models.PositiveIntegerField(default=0)
    # created_at =


class Role(models.Model):
    name = models.CharField(max_length=30)
