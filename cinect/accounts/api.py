from rest_framework import generics, permissions
from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import UserSerializer, RegisterSerializer, LoginSerializer, UserDetailsSerializer, FriendListSerializer
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework import status, mixins, generics, exceptions
from .models import FriendList, UserDetails
from itertools import chain
from django.db.models import F
from django.db.models import Q
# Register API


class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        data = request.data
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        data["user"] = user.id
        user_details = UserDetailsSerializer(data=data)
        user_details.is_valid(raise_exception=True)
        user_deatils_save = user_details.save()

        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "user_details": UserDetailsSerializer(user_deatils_save).data,
            "token": AuthToken.objects.create(user)[1]
        })

# Login API


class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        _, token = AuthToken.objects.create(user)
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": token
        })

# Get User API


class UserAPI(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


class AllUsersGenericApi(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def get(self, request, *args, **kwargs):
        user_queryset = User.objects.values(
            'id', 'details__name', 'details__surname').annotate(name=F('details__name'), surname=F('details__surname'))
        return Response({
            user_queryset
        })


class UserDetailsGenericApi(
        generics.GenericAPIView, mixins.ListModelMixin, mixins.RetrieveModelMixin, mixins.CreateModelMixin, mixins.UpdateModelMixin, mixins.DestroyModelMixin):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    queryset = UserDetails.objects.all().order_by('-pk')
    serializer_class = UserDetailsSerializer

    def get(self, request, user_pk=None):
        if user_pk:
            self.queryset = self.queryset.filter(
                user_id=user_pk)
        return self.list(request)


class FriendListGenericApi(
        generics.GenericAPIView, mixins.ListModelMixin, mixins.RetrieveModelMixin, mixins.CreateModelMixin, mixins.UpdateModelMixin, mixins.DestroyModelMixin):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    queryset = FriendList.objects.all().order_by('-pk')
    serializer_class = FriendListSerializer

    def post(self, request, *args, **kwargs):
        data = request.data
        data["user_requesting"] = request.user.id
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        friend_request = serializer.save()

        return Response({
            "friend_request": FriendListSerializer(friend_request).data
        })

    def get(self, request):
        response = self.queryset.filter(
            user_requested=request.user.id).values('user_requesting_id', 'user_requesting__details__name', 'user_requesting__details__surname', 'confirmed').annotate(id=F('user_requesting_id'), name=F('user_requesting__details__name'), surname=F('user_requesting__details__surname'))
        return Response(
            response
        )

    def patch(self, request):
        print(request.data['user_requesting'])
        if 'user_requesting' in request.data and 'confirmed' in request.data:
            friend_request = FriendList.objects.get(
                user_requesting=request.data['user_requesting'], user_requested=request.user.id)
            if request.data['confirmed'] == True:
                friend_request.confirmed = True
                friend_request.save()
            else:
                friend_request.delete()

        return self.list(request)


class GetFriendListGenericApi(
        generics.GenericAPIView, mixins.ListModelMixin, mixins.RetrieveModelMixin, mixins.CreateModelMixin, mixins.UpdateModelMixin, mixins.DestroyModelMixin):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    queryset = FriendList.objects.all().order_by('-pk')
    serializer_class = FriendListSerializer

    def get(self, request):
        response = self.queryset.filter(
            Q(user_requested=request.user.id) | Q(user_requested=request.user.id)).values('user_requesting_id', 'user_requesting__details__name', 'user_requesting__details__surname', 'confirmed').annotate(id=F('user_requesting_id'), name=F('user_requesting__details__name'), surname=F('user_requesting__details__surname'))
        return Response(
            response
        )
