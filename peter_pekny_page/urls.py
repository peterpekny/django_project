from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('create-project/', views.create_project, name='create_project'),
    path('save-article/', views.save_article, name='save_article'),
]
