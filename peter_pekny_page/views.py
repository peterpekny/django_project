from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages
# Importuj JsonResponse z modulu django.http - editorjs2
import json
from django.http import JsonResponse



# Create your views here.

from django.http import HttpResponse

# =======================================
# Main Function for INDEX page
# =======================================
from .models import Article, Category, Comment

def index(request):
    """Hlavná stránka - zobrazí kategórie a články podľa viditeľnosti"""

    # Spracovanie POST žiadosti na prihlásenie
    if request.method == "POST":
        username = request.POST.get('username')
        password = request.POST.get('password')

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            return redirect("/")  # Presmeruje na tú istú stránku po prihlásení
        else:
            messages.error(request, "Nesprávne meno alebo heslo")

    # Spracovanie GET žiadosti na odhlásenie
    if request.GET.get("logout"):
        logout(request)
        return redirect("/")  # Presmerovanie na hlavnú stránku

    # Filtrujeme články podľa prihlásenia
    if request.user.is_authenticated:
        # Prihlásený používateľ vidí všetky články okrem vymazaných
        categories = Category.objects.prefetch_related(
            'article_set'
        ).all()
        articles = Article.objects.filter(is_deleted=False)
    else:
        # Neprihlásený používateľ vidí len verejné články
        categories = Category.objects.prefetch_related(
            'article_set'
        ).all()
        articles = Article.objects.filter(is_deleted=False, visibility='public')

    # Priradíme filtrované články ku kategóriám
    for category in categories:
        category.articles = articles.filter(category=category)

    return render(request, "peter_pekny_page/index.html", {"categories": categories})

# ============================
# Create detail of one article
# ============================

def article_detail_page(request, number):
    article = Article.objects.get(id=number)
    # print(article)
    return render(request, 'peter_pekny_page/detail_template.html', { 'article': article })
    

# ===========================
# function for create article 
# ===========================
# - impoer form for CKediror - Article form 
# - to be able to load on the page
from .forms import ArticleForm

def create_article(request):
    if request.method == 'POST':
        form = ArticleForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('/')
    else:
        form = ArticleForm()

    return render(request, 'peter_pekny_page/create_article.html', {'form': form})


from django.shortcuts import get_object_or_404
from django.http import JsonResponse

# def edit_article(request, article_id):
#     """Upraví článok priamo na stránke (AJAX)."""
#     article = get_object_or_404(Article, id=article_id)
    
#     if request.method == "POST" and request.user.is_authenticated:
      
#         form = ArticleForm(request.POST, instance=article)
        
#         article.title = request.POST.get("title")
#         article.short_description = request.POST.get("short_description")
#         article.content = request.POST.get("content")
#         article.save()

#         return JsonResponse({"success": True})  # Odpoveď pre AJAX

#     return JsonResponse({"success": False}, status=400)


def edit_article(request, article_id):
    """Upraví článok priamo na stránke (AJAX)."""
    article = get_object_or_404(Article, id=article_id)

    print(article)
    
    form = ArticleForm(instance=article)

    if request.method == "POST" and request.user.is_authenticated:
      
        form = ArticleForm(request.POST, instance=article)
        
        article.title = request.POST.get("title")
        article.short_description = request.POST.get("short_description")
        article.content = request.POST.get("content")
        article.save()

        return redirect(request, 'peter_pekny_page/edit_article.html', {'form': form})

    return render(request, 'peter_pekny_page/edit_article.html', {'form': form, article: article})


# =====================
# vytvorim list article - pomocna funkcia
# =====================

def article_list(request):
    articles = Article.objects.filter(is_deleted=False, visibility="public").order_by('-created_at')
    return render(request, 'peter_pekny_page/article_list.html', {'articles': articles})


# =====================================
# Pridame funkciu na pridanie komentára
# =====================================
from .forms import CommentForm

def add_comment(request):
    if request.method == 'POST':
        form = CommentForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('article_list')  # Po uložení presmerovanie na zoznam článkov
    else:
        form = CommentForm()
    
    return render(request, 'peter_pekny_page/comment_form.html', {'form': form})

# =====================================
# Test view function for map plugin
# =====================================

import gpxpy

def show_map(request):
    # Cesta k GPX súboru
    gpx_file_path = "media/export.gpx"

    # Načítanie GPX dát
    with open(gpx_file_path, "r") as gpx_file:
        gpx = gpxpy.parse(gpx_file)

    # Extrakcia trasových bodov
    route_points = []
    for track in gpx.tracks:
        for segment in track.segments:
            for point in segment.points:
                route_points.append((point.latitude, point.longitude))

    return render(request, "peter_pekny_page/map.html", {"route_points": route_points})

# =====================================


@login_required
def create_project(request):
    return render(request, "peter_pekny_page/create_project.html")



# save_article view function - editorjs2

# @login_required
# def save_article(request):
#     if request.method == "POST":
#         data = json.loads(request.body)
#         title = data.get("title", "Untitled")  # Ak nie je nadpis, použije "Untitled"
#         content = data.get("content", "")

#         article = Article.objects.create(title=title, content=content)
#         return JsonResponse({"message": "Article saved successfully!", "article_id": article.id})

#     return JsonResponse({"error": "Invalid request"}, status=400)