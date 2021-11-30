from rest_framework import serializers
from .models import MovieSeries, UserMovieSeries


class MovieSeriesSerialzier(serializers.ModelSerializer):
    class Meta:
        model = MovieSeries
        fields = "__all__"

class UserMovieSeriesSerialzier(serializers.ModelSerializer):
    class Meta:
        model = UserMovieSeries
        fields = "__all__"


# Register Serializer
