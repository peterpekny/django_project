from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages


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


@login_required
def create_project(request):
    return render(request, "peter_pekny_page/create_project.html")
