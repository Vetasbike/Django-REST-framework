"""todo URL Configuration
The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from graphene_django.views import GraphQLView
from rest_framework import permissions
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView

from todoapp.views import ProjectModelViewSet, TodoModelViewSet
from userapp.views import UserModelViewSet

from drf_yasg.views import get_schema_view
from drf_yasg import openapi

scheme_view = get_schema_view(
    openapi.Info(
        title='Todo',
        default_version='v1',
        description='Docs',
        contact=openapi.Contact(email='kovbozh@gmail.com'),
        license=openapi.License(name='MIT License'),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

router = DefaultRouter()
router.register('users', UserModelViewSet)
router.register('projects', ProjectModelViewSet)
router.register('todos', TodoModelViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api-token/', obtain_auth_token, name='token'),
    path('api-auth/', include('rest_framework.urls')),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    # path('', include('userapp.urls')),
    path('api/users/v1', include('userapp.urls', namespace='v1')),
    path('api/users/v2', include('userapp.urls', namespace='v2')),

    path('swagger<str:format>/', scheme_view.without_ui()),
    path('swagger/', scheme_view.with_ui('swagger')),
    path('redoc/', scheme_view.with_ui('redoc')),

    path('graphql/', GraphQLView.as_view(graphiql=True)),

    path('', TemplateView.as_view(template_name='index.html')),
]
