from django.urls import path, include
from . import views


from django.conf import settings
from django.conf.urls.static import static

app_name = 'peter_pekny_page'

urlpatterns = [
    path('', views.index, name='index'),
    path('create-project/', views.create_project, name='create_project'),
    path('comment/new/', views.add_comment, name='add_comment'),
    path('article/new/', views.create_article, name='create_article'),
    path('articles/', views.article_list, name='article_list'),
    path('article/<int:number>/', views.article_detail_page, name='article_detail'),
    path("article/<int:article_id>/edit/", views.edit_article, name="article_edit"),
    #path('save-article/', views.save_article, name='save_article'),
    # path('editorjs/', views.editorjs, name='editorjs'),
    # path("ckeditor5/", include('django_ckeditor_5.urls')),
    path('map/', views.show_map, name='map'),
]  + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
