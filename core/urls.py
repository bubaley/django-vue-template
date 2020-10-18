from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from core.settings import common

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('djadmin/', admin.site.urls),

    path('api/v1/', include('user.urls')),
    path('api/v1/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/v1/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    re_path(r'^(?!media\/).*', TemplateView.as_view(template_name='index.html')),
] + static(common.MEDIA_URL, document_root=common.MEDIA_ROOT)
