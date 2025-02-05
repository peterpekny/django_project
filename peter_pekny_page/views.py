from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages
# Importuj JsonResponse z modulu django.http - editorjs2
import json
from django.http import JsonResponse
#from .models import Article


# Create your views here.

from django.http import HttpResponse


def index(request):
    # Spracovanie POST žiadosti na prihlásenie
    if request.method == "POST":
        username = request.POST.get('username')
        password = request.POST.get('password')
        # Autentifikácia používateľa - pomocou funkcie authenticate z modulu django.contrib.auth (vráti objekt User alebo None)
        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            return redirect("/")  # Presmeruje na tú istú stránku po prihlásení
        else:
            messages.error(request, "Nesprávne meno alebo heslo")

    # Spracovanie GET žiadosti na odhlásenie (napr. /?logout=True)
    if request.GET.get("logout"):
        logout(request)
        return redirect("/")  # Presmerovanie na hlavnú stránku

    return render(request, "peter_pekny_page/index.html")

def editorjs(request):
    return render(request, "peter_pekny_page/editorjs.html")


# Vytvorim funkciu create article
from .forms import ArticleForm

def create_article(request):
    if request.method == 'POST':
        form = ArticleForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('article_list')
    else:
        form = ArticleForm()

    return render(request, 'peter_pekny_page/create_article.html', {'form': form})

# vytvorim list article
from .models import Article
def article_list(request):
    articles = Article.objects.filter(is_deleted=False, visibility="public").order_by('-created_at')
    return render(request, 'peter_pekny_page/article_list.html', {'articles': articles})



# Pridame funkciu na pridanie komentára
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