from rest_framework import generics, permissions
from rest_framework.response import Response
from .serializers import MovieSeriesSerialzier, UserMovieSeriesSerialzier
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework import status, mixins, generics, exceptions
from .models import MovieSeries, UserMovieSeries
from accounts.models import UserDetails
from itertools import chain
from django.db.models import F
from django.db.models import Q
from django.db.models import ProtectedError
from django.db import IntegrityError
import datetime
from rest_framework.decorators import api_view


class MovieSeriesIMDBGenericApi(
        generics.GenericAPIView, mixins.ListModelMixin, mixins.RetrieveModelMixin, mixins.CreateModelMixin, mixins.UpdateModelMixin, mixins.DestroyModelMixin):
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    queryset = MovieSeries.objects.all().order_by('-pk')
    serializer_class = MovieSeriesSerialzier

    def get(self, request, pk=None):
        if pk:
            self.queryset = self.queryset.filter(
                service_id=pk)
        return self.list(request)

    def post(self, request):
        is_title_present = MovieSeries.objects.filter(
            title=request.data["title"])
        if(len(is_title_present) == 0):

            new_movie_series = MovieSeriesSerialzier(data=request.data)
            new_movie_series.is_valid(raise_exception=True)
            new_movie_series_save = new_movie_series.save()

            data = {"user": request.user.id, "movie_series": new_movie_series_save.id,
                    "rating": request.data["rating"], "watched_at": datetime.datetime.utcnow()}
            serializer = UserMovieSeriesSerialzier(data=data)
            serializer.is_valid(raise_exception=True)
            res = serializer.save()

            user_details = UserDetails.objects.get(
                user=request.user)
            if 'is_movie' in request.data and request.data['is_movie'] == True:
                user_details.watched_time_movies = user_details.watched_time_movies + \
                    request.data["length"]
                user_details.save()
            elif "is_series" in request.data and request.data['is_series'] == True:
                user_details.watched_time_series = user_details.watched_time_series + \
                    request.data["length"]
                user_details.save()

        elif(len(is_title_present) == 1):
            data = {"user": request.user.id, "movie_series": is_title_present[0].id,
                    "rating": request.data["rating"], "watched_at": datetime.datetime.utcnow()}
            serializer = UserMovieSeriesSerialzier(data=data)
            serializer.is_valid(raise_exception=True)
            res = serializer.save()

            user_details = UserDetails.objects.get(
                user=request.user)
            if 'is_movie' in request.data and request.data['is_movie'] == True:
                user_details.watched_time_movies = user_details.watched_time_movies + \
                    request.data["length"]
                user_details.save()
            elif "is_series" in request.data and request.data['is_series'] == True:
                user_details.watched_time_series = user_details.watched_time_series + \
                    request.data["length"]
                user_details.save()

        else:
            return Response("error", status=status.HTTP_400_BAD_REQUEST)

        return Response("res", status=status.HTTP_200_OK)

    def delete(self, request):
        data = request.data
        if 'ids' not in data:
            raise exceptions.APIException('Invalid request!')

        try:
            count = MovieSeries.objects.filter(
                id__in=request.data['ids']).delete()
        except (ProtectedError, IntegrityError) as e:
            return Response({"message": str(e)}, status=status.HTTP_409_CONFLICT)

        return Response({"count": count[0]}, status=status.HTTP_200_OK)


class MovieSeriesCinectGenericApi(
        generics.GenericAPIView, mixins.ListModelMixin, mixins.RetrieveModelMixin, mixins.CreateModelMixin, mixins.UpdateModelMixin, mixins.DestroyModelMixin):
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    queryset = MovieSeries.objects.all().order_by('-pk')
    serializer_class = MovieSeriesSerialzier

    def get(self, request, pk=None):
        self.queryset = self.queryset.filter(is_imdb=False, is_movie=True)
        return self.list(request)

    def post(self, request, pk=None):

        return Response({
            'data': self.create(request).data
        })

    def delete(self, request):
        data = request.data
        if 'ids' not in data:
            raise exceptions.APIException('Invalid request!')
        try:
            count = MovieSeries.objects.filter(
                id__in=request.data['ids']).delete()
        except (ProtectedError, IntegrityError) as e:
            return Response({"message": str(e)}, status=status.HTTP_409_CONFLICT)

        return Response({"count": count[0]}, status=status.HTTP_200_OK)


@api_view(['GET'])
def movie_series_watched(request, pk=None):
    resp = {}

    if pk != None:
        user_watched_models = UserMovieSeries.objects.filter(user_id=pk)
    else:
        user_watched_models = UserMovieSeries.objects.filter(
            user_id=request.user.id)

    watched_models = []
    for m in user_watched_models:
        resp_obj = {}
        resp_obj["user_detalis"] = UserMovieSeriesSerialzier(
            m, many=False).data
        resp_obj["info"] = MovieSeriesSerialzier(
            m.movie_series, many=False).data
        watched_models.append(resp_obj)

    return Response(watched_models)


@api_view(['GET'])
def get_cinect_series(request, pk=None):
    cinect_series = MovieSeries.objects.filter(
        is_imdb=False, is_series=True)
    cinect_series_serialized = MovieSeriesSerialzier(
        cinect_series, many=True).data

    return Response(cinect_series_serialized)
