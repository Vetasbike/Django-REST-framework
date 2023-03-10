from django.urls import path
from .views import UserListAPIView

app_name = 'userapp'

urlpatterns = [
    path('api/<str:version>/users/', UserListAPIView.as_view()),
    path('', UserListAPIView.as_view()),
]
