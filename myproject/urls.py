from django.contrib import admin
from django.urls import path, include

from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('djadmin/', admin.site.urls),
    path("ckeditor5/", include('django_ckeditor_5.urls')),
    # Add peter_pekny_page app to the urlpatterns list
    path('', include('peter_pekny_page.urls')),
    # path('editorjs/', include('django_editorjs2.urls')),
    path('accounts/', include('allauth.urls')),
    

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

