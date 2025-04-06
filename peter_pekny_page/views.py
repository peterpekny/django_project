from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
# from django.contrib.auth.decorators import login_required
from django.contrib import messages
# from django.http import HttpResponse

# Importujem modely pre články, kategórie a komentáre
from peter_pekny_page.models import Article, Category, Comment

# Importujem formulare pre články a komentáre
from peter_pekny_page.forms import ArticleForm, CommentForm

# Importuj JsonResponse z modulu django.http - editorjs2
# import json
# from django.http import JsonResponse

# =======================================
# Main Function for INDEX page
# =======================================
# def index(request):
#     """Hlavná stránka - zobrazí kategórie a články podľa viditeľnosti"""

#     # LOGIN FORM: Spracovanie POST žiadosti na prihlásenie
#     if request.method == "POST":
#         username = request.POST.get('username')
#         password = request.POST.get('password')
#         # Autentifikácia používateľa
#         user = authenticate(request, username=username, password=password)
        
#         # Ak je používateľ autentifikovaný, prihlásime ho
#         if user is not None:
#             login(request, user)
#             return redirect('peter_pekny_page:index')
#         else:
#             messages.error(request, "Nesprávne meno alebo heslo") # treba dorobit

#     # Spracovanie GET žiadosti na odhlásenie, Ak je v URL parameter logout, odhlásime používateľa
#     if request.GET.get("logout"):
#         logout(request)
#         return redirect('peter_pekny_page:index')

#     # Filtrujeme články podľa prihlásenia super_usera
#     if request.user.is_authenticated and request.user.is_superuser:
#         # Prihlásený používateľ vidí všetky články okrem vymazaných
#         categories = Category.objects.prefetch_related(
#             'article_set'
#         ).all()
#         articles = Article.objects.filter(is_deleted=False)
#     else:
#         # Neprihlásený používateľ vidí len verejné články
#         categories = Category.objects.prefetch_related(
#             'article_set'
#         ).all()
#         articles = Article.objects.filter(is_deleted=False, visibility='public')

#     # Priradíme filtrované články ku kategóriám
#     for category in categories:
#         category.articles = articles.filter(category=category).order_by('order')

#     return render(request, "peter_pekny_page/index.html", {"categories": categories})

from .forms import ContactForm  # pridaj na začiatok
from django.core.mail import send_mail  # pre odosielanie mailov
from django.conf import settings


def index(request):
    """Hlavná stránka - zobrazí kategórie a články + spracuje formuláre"""
    
    contact_form = ContactForm()

    # ========== SPRACOVANIE POST ŽIADOSTÍ ==========
    # z html formularov , typu "form_type" ==========
    if request.method == "POST":
        form_type = request.POST.get("form_type")

        # ==== LOGIN FORM ====
        if form_type == "login":
            
            username = request.POST.get('username')
            password = request.POST.get('password')
            user = authenticate(request, username=username, password=password)
            
            if user is not None:
                
                login(request, user)
                return redirect('peter_pekny_page:index')
            else:
                
                messages.error(request, "Nesprávne meno alebo heslo")
                # redirectujem na wikipediu - len tak zo srandy
                return redirect('https://en.wikipedia.org/wiki/Idiot')

        # ==== EMAIL FORMULÁR ====
        elif form_type == "contact":
            
            contact_form = ContactForm(request.POST)
            if contact_form.is_valid():
                
                name = contact_form.cleaned_data['name']
                email = contact_form.cleaned_data['email']
                message = contact_form.cleaned_data['message']
                
                full_message = f"Správa od: {name} <{email}>\n\n{message}"

                send_mail(
                    subject="Kontakt z webu peter.pekny.online",
                    message=full_message,
                    from_email=settings.DEFAULT_FROM_EMAIL,
                    recipient_list=settings.CONTACT_RECIPIENT_EMAIL,
                    fail_silently=False,
                )
                
                messages.success(request, "Ďakujem za správu! Ozvem sa čoskoro.")
                return redirect('peter_pekny_page:index')

    # ========== SPRACOVANIE GET ==========
    if request.GET.get("logout"):
        logout(request)
        return redirect('peter_pekny_page:index')

    # ========== SAMOTNY OBSAH ==========
    if request.user.is_authenticated and request.user.is_superuser:
        
        categories = Category.objects.prefetch_related('article_set').all()
        articles = Article.objects.filter(is_deleted=False)
    else:
        
        categories = Category.objects.prefetch_related('article_set').all()
        articles = Article.objects.filter(is_deleted=False, visibility='public')

    for category in categories:
        category.articles = articles.filter(category=category).order_by('order')

    return render(request, "peter_pekny_page/index.html", {
        "categories": categories,
        "contact_form": contact_form
    })


# ============================
# View detail of one article
# ============================
def article_detail_page(request, article_id):
    
    # Nacitame clanky a komentare
    article = get_object_or_404(Article, id=article_id)
    comments = article.comments.all()
    
    # Ukladanie komentara
    if request.method == "POST":
        
        form = CommentForm(request.POST)
        if form.is_valid():
            
            comment = form.save(commit=False)
            comment.article = article
            comment.author = request.user  # Predpokladam, že používateľ je prihlásený
            comment.save()
            # Reloadnem stranku na zobrazenie komentara
            return redirect ('peter_pekny_page:article_detail', article_id=article_id)
    else:
        
        # Ak nie je POST, vytvorim prazdny formular
        form = CommentForm()
    
    # Vratim stranku s clankom a komentarmi
    return render(request, 'peter_pekny_page/detail_article.html', {
      'article': article,
      'comments': comments,
      'form': form
    })
    

# =====================================================================
# function for create article
# - only superuser can create article, otherwise redirect to index page 
# =====================================================================


def create_article(request):
    
    # Ak nie je prihlásený ako superuser, presmeruje na hlavnú stránku
    if not request.user.is_superuser:
        
        return redirect('peter_pekny_page:index')
    
    # Ak je prihlásený ako superuser, zobrazí formulár na vytvorenie článku
    if request.method == 'POST':
        
        form = ArticleForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('/')
    else:
        
        form = ArticleForm()

    return render(request, 'peter_pekny_page/create_article.html', {'form': form})

# =====================================
# function for edit article
# =====================================
from django.shortcuts import get_object_or_404

def edit_article(request, article_id):
    """Upraví článok priamo na stránke."""

    # Ak nie je prihlásený ako superuser, presmeruje na hlavnú stránku
    if not request.user.is_superuser:
        
        return redirect('/') 
    
    # Nacitame obsah clanku
    article = get_object_or_404(Article, id=article_id)
    
    # Definujem formular s datami z DB
    form = ArticleForm(instance=article)
    
    # V pripade POST s fromulara = ulozim zmeny
    if request.method == "POST" and request.user.is_authenticated:
      
        form = ArticleForm(request.POST, instance=article)
        
        # Ulozime zmeny
        article.title = request.POST.get("title")
        article.short_description = request.POST.get("short_description")
        article.content = request.POST.get("content")
        article.visibility = request.POST.get("visibility")

        # Ukladanie kategorie - ak je zmenena
        # Nacitame ID kategorie z formulara - a ulozime do databazy
        category_id = request.POST.get("category")
        if category_id:  # Ak je ID kategórie zadané
            
            article.category = Category.objects.get(id=category_id)

        article.save()
       
        # Po ulozeni, sa vratim sa na stranku s detailom clanku
        return redirect ('peter_pekny_page:article_detail', article_id=article_id)
        
    # Po strlaceni edit vyrendrujem stranku EDIT a formular s datami z DB
    return render(request, 'peter_pekny_page/edit_article.html', {'form': form, 'article': article})


# ======================= #
# Delete article function #
# ======================= #
from django.shortcuts import redirect

def delete_article(request, article_id):
    """Označí článok ako vymazaný a presmeruje na hlavnú stránku."""

    # safety reasons - only superuser can delete article
    if not request.user.is_superuser:
        
        return redirect('peter_pekny_page:index')
    
    # Nacitame clanok a oznacime ho ako vymazany    
    article = get_object_or_404(Article, id=article_id)
    
    if request.method == "POST":
        
        article.is_deleted = True  # Označíme článok ako vymazaný
        article.save()
        messages.success(request, "Článok bol úspešne vymazaný.")
        return redirect('peter_pekny_page:index')  # Presmerovanie na hlavnú stránku

    return redirect('peter_pekny_page:edit_article', article_id=article_id)  # Ak by niekto volal GET


# =====================================
# function for delete comment
# =====================================
from django.urls import reverse

def delete_comment(request, comment_id):
    """Vymaže komentár, ak patrí prihlásenému používateľovi"""
    
    # Načítame komentár z databázy alebo vrátime 404
    comment = get_object_or_404(Comment, id=comment_id)
    
    # Overíme, či je aktuálny používateľ autorom komentára
    if request.user == comment.author:
        
        comment.delete()
        messages.success(request, "Komentár bol úspešne vymazaný.")
    else:
        
        messages.error(request, "Nemáte oprávnenie na vymazanie tohto komentára.")
    
    # Presmerovanie späť na stránku článku
    return redirect(reverse('peter_pekny_page:article_detail', args=[comment.article.id]))


# =============== #
# Search function #
# =============== #

from django.db.models import Q

def search_articles(request):
    query = request.GET.get('q', '')
    results = []

    if len(query) >= 3:
        
        results = Article.objects.filter(
            Q(title__icontains=query) |
            Q(short_description__icontains=query) |
            Q(content__icontains=query),
            is_deleted=False,
            visibility='public'
        ).order_by('-created_at')

    return render(request, "peter_pekny_page/search_results.html", {
        "query": query,
        "results": results,
    })

# =====================
# vytvorim list article - pomocna funkcia
# =====================

# def article_list(request):
#     articles = Article.objects.filter(is_deleted=False, visibility="public").order_by('-created_at')
#     return render(request, 'peter_pekny_page/article_list.html', {'articles': articles})



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
