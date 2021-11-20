from rest_framework import generics, permissions
from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import UserSerializer, RegisterSerializer, LoginSerializer, UserDetailsSerializer
from rest_framework.authtoken.models import Token
from rest_framework import status, mixins, generics, exceptions
from .models import UserDetails

# Register API


class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        print(request.data)
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

class UserDetailsGenericApi(
        generics.GenericAPIView, mixins.ListModelMixin, mixins.RetrieveModelMixin, mixins.CreateModelMixin, mixins.UpdateModelMixin, mixins.DestroyModelMixin):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    queryset = UserDetails.objects.all().order_by('-pk')
    serializer_class = UserDetailsSerializer
    filterset_fields = '__all__'

    def get(self, request, user_pk=None):
        if user_pk:
            self.queryset = self.queryset.filter(
                user_id = user_pk)
        return self.list(request)