from django.urls import path
from . import views


from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('', views.index, name='index'),
    path('create-project/', views.create_project, name='create_project'),
    path('save-article/', views.save_article, name='save_article'),
    path('editorjs/', views.editorjs, name='editorjs'),
]  + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
