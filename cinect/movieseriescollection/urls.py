from django.urls import path, include
from .api import MovieSeriesIMDBGenericApi, movie_series_watched, MovieSeriesCinectGenericApi, get_cinect_series

urlpatterns = [
    path('api/movie-series-imdb', MovieSeriesIMDBGenericApi.as_view()),
    path('api/movie-series-imdb/<str:pk>', MovieSeriesIMDBGenericApi.as_view()),
    path('api/movie-series-cinect', MovieSeriesCinectGenericApi.as_view()),
    path('api/movie-series-cinect/<str:pk>', MovieSeriesCinectGenericApi.as_view()),
    path('api/get-watched/<str:pk>', movie_series_watched),
    path('api/get-watched', movie_series_watched),
    path('api/get-cinsect-series', get_cinect_series)
]
