# default imports
from django.urls import path, include

# import the views from the app
from peter_pekny_page import views

# import the settings and static
from django.conf import settings
from django.conf.urls.static import static

# define the app name - namespace
app_name = 'peter_pekny_page'

# define the url patterns for the app logic
urlpatterns = [
    # index page
    path('', views.index, name='index'),
    
    # paths related to articles    
    path('article/new/', views.create_article, name='create_article'),
    path('article/<int:article_id>/', views.article_detail_page, name='article_detail'),
    path("article/<int:article_id>/edit/", views.edit_article, name="article_edit"),
    path('article/<int:article_id>/delete/', views.delete_article, name='delete_article'),
    # paths related to comments
    path('comment/<int:comment_id>/delete/', views.delete_comment, name='delete_comment'),
    # path for search function
    path('search/', views.search_articles, name='search_results'),
    path('admin/', views.wiki_redirect, name='wiki_redirect'),
    path('api/get_scores/', views.get_scores, name='get_scores'),
    path('api/submit_score/', views.submit_score, name='submit_score'),
    path('youtube-progress/', views.youtube_progress, name='youtube_progress'),
  
]  + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) # add static files to the urlpatterns
