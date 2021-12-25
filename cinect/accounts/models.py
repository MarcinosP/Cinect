from django.db import models
from django.contrib.auth.models import User


class UserDetails(models.Model):
    user = models.ForeignKey(
        User, related_name="details", on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length=100, null=True, blank=True)
    surname = models.CharField(max_length=100, null=True, blank=True)
    nationality = models.CharField(max_length=100, null=True, blank=True)
    languages = models.CharField(max_length=100, null=True, blank=True)
    fav_movie = models.CharField(max_length=100, null=True, blank=True)
    fav_series = models.CharField(max_length=100, null=True, blank=True)
    watched_time_movies = models.IntegerField(default=0)
    watched_time_series = models.IntegerField(default=0)
    date_of_birth = models.DateTimeField(null=True)
    avatar = models.ImageField(upload_to='avatars', null=True, blank=True)


class FriendList(models.Model):
    user_requesting = models.ForeignKey(
        User, related_name="requesting", on_delete=models.CASCADE, null=True)
    user_requested = models.ForeignKey(
        User, related_name="requested", on_delete=models.CASCADE, null=True)
    confirmed = models.BooleanField(default=False)

    class Meta:
        unique_together = ['user_requesting', 'user_requested', ]
