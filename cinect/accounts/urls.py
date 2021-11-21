from django.urls import path, include
from .api import RegisterAPI, LoginAPI, UserAPI, UserDetailsGenericApi, AllUsersGenericApi
from knox import views as knox_views

urlpatterns = [
    path('api/auth', include('knox.urls')),
    path('api/auth/register', RegisterAPI.as_view()),
    path('api/auth/login', LoginAPI.as_view()),
    path('api/auth/user', UserAPI.as_view()),
    path('api/auth/user-details', UserDetailsGenericApi.as_view()),
    path('api/auth/all-users', AllUsersGenericApi.as_view()),
    path('api/auth/user-details/<str:user_pk>',
         UserDetailsGenericApi.as_view()),
    path('api/auth/logout', knox_views.LogoutView.as_view(), name='knox_logout')
]
