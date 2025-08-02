from pathlib import Path
import os # import os for definition of static files
from decouple import config  # Import kniznice decouple - pre nacitanie secret key z .env súboru

# Import secret key from .env file
"""
    how thw secrets are coled from .env file
    SECRET_GOOGLE_ID = config('SECRET_GOOGLE_ID')
    SECRET_GOOGLE_KEY = config('SECRET_GOOGLE_KEY')
    SECRET_GITHUB_ID = config('SECRET_GITHUB_ID')
    SECRET_GITHUB_KEY = config('SECRET_GITHUB_KEY')
    SECRET_DJANGO_KEY = config('SECRET_DJANGO_KEY')
"""
# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = config('SECRET_DJANGO_KEY')

# changing default URL for admin
ADMIN_URL = 'djadmin/'
CSRF_COOKIE_HTTPONLY = False

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True
#ALLOWED_HOSTS = ['.pekny.online', '127.0.0.1']
ALLOWED_HOSTS = ['127.0.0.1']

# Email settings
# EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_BACKEND = 'peter_pekny_page.email_backend.UnsafeEmailBackend'
EMAIL_HOST = config('SECRET_EMAIL_HOST')
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = config('SECRET_EMAIL_HOST_USER')  # použij presne ten, čo funguje v Nextcloud
EMAIL_HOST_PASSWORD = config('SECRET_EMAIL_HOST_PASSWORD')
DEFAULT_FROM_EMAIL = EMAIL_HOST_USER
CONTACT_RECIPIENT_EMAIL = ['peter@pekny.online', 'peter.pekny@gmail.com']

# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    
    # My site app
    'peter_pekny_page',
    
    # virtual keyboard
    'django_editorjs2', # EditorJs -- will be removed
    'django_ckeditor_5', # CKEditor 5
    'adminsortable2', # Order of article
    
    # allauth
    'django.contrib.sites',  # allauth
    'allauth', # allauth
    'allauth.account', # allauth
    'allauth.socialaccount', # allauth
    'allauth.socialaccount.providers.google', # allauth
    # 'allauth.socialaccount.providers.facebook', # allauth
    'allauth.socialaccount.providers.github', # allauth
    'corsheaders', # Cors because of fetching data from database 
]

# allauth
AUTHENTICATION_BACKENDS = [
    'django.contrib.auth.backends.ModelBackend', # allauth
    'allauth.account.auth_backends.AuthenticationBackend', # allauth
]

# allauth
LOGIN_REDIRECT_URL = '/'
ACCOUNT_LOGOUT_REDIRECT_URL = '/'

# allauth
SITE_ID = 1

# allauth
SOCIALACCOUNT_LOGIN_ON_GET = True

# allauth (google, github)
SOCIALACCOUNT_PROVIDERS = {
    # google
    'google': {
        'APP': {
            'client_id': config('SECRET_GOOGLE_ID'),
            'secret': config('SECRET_GOOGLE_KEY'),
            'key': ''
        },
        'SCOPE': ['profile', 'email'],
        'AUTH_PARAMS': {'access_type': 'online'},
        'METHOD': 'oauth2',
        'VERIFIED_EMAIL': True,
    },
    # github
    'github': {
        'APP': {
            'client_id': config('SECRET_GITHUB_ID'),    
            'secret': config('SECRET_GITHUB_KEY'), },
        },
}

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',

    # Add the account middleware:
    "allauth.account.middleware.AccountMiddleware", # allauth
]

# allow CORS
CORS_ALLOW_ALL_ORIGINS = True

CORS_ALLOWED_ORIGINS = [
    "http://127.0.0.1:8000",
    "http://localhost:8000",
    "https://peter.pekny.online",
]

ROOT_URLCONF = 'myproject.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

# wsgi_application for deployment
WSGI_APPLICATION = 'myproject.wsgi.application'


# Database
# https://docs.djangoproject.com/en/5.1/ref/settings/#databases
# We will use SQLite database for this project
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}


# Password validation
# https://docs.djangoproject.com/en/5.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.1/topics/i18n/

LANGUAGE_CODE = 'sk'
TIME_ZONE = 'Europe/Prague'
USE_I18N = True
USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.1/howto/static-files/

#  added because of static files, like CSS styles, JS files, fonts, and images and other page stuff
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')  # Pridaj tento riadok
STATIC_URL = '/static/'

# added for media files
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
MEDIA_URL = '/media/'

# Default primary key field type
# https://docs.djangoproject.com/en/5.1/ref/settings/#default-auto-field
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


# Add for EditorJs
DJANGO_EDITORJS2_CONFIG = {
    # Preprocessors for preview generation
    "image_link_preprocessor": "django_editorjs2.blogapp.utils.image_link_preprocessor",
    "download_link_preprocessor": "django_editorjs2.blogapp.utils.download_link_preprocessor",
    
    # Custom styling and attributes for different block types
    "extra_attributes": {
        "list": {"style": "list-style: none"},
        "checklist": {"style": "list-style: none"},
        "paragraph": {},
        "header": {},
        "quote": {},
        "code": {},
        "image": {},
        "embed": {},
        "table": {},
        "delimiter": {},
        "attaches": {},
    },
    
    # before saving the file, djanog model object EditorJsUploadFiles is passed to this function
    "callback_before_file_save": "django_editorjs2.blogapp.utils.callback_before_file_save",
    # before returning the response, the response object is passed to this function
    "callback_before_return_response": "django_editorjs2.blogapp.utils.callback_before_return_response",
    
    # widget
    "editorjs_field_preview_callback": "django_editorjs2.blogapp.utils.editorjs_field_preview_callback",
    "editorjs_field_save_callback": "django_editorjs2.blogapp.utils.editorjs_field_save_callback",

    "max_attachment_size_bytes": 5 * 1024 * 1024,  # 5 MiB
    "attachment_file_extensions": ["zip","doc","docx",]

}


# CKEDITOR_5  - configuration for CKEditor 5
customColorPalette = [
        {
            'color': 'hsl(4, 90%, 58%)',
            'label': 'Red'
        },
        {
            'color': 'hsl(340, 82%, 52%)',
            'label': 'Pink'
        },
        {
            'color': 'hsl(291, 64%, 42%)',
            'label': 'Purple'
        },
        {
            'color': 'hsl(262, 52%, 47%)',
            'label': 'Deep Purple'
        },
        {
            'color': 'hsl(231, 48%, 48%)',
            'label': 'Indigo'
        },
        {
            'color': 'hsl(207, 90%, 54%)',
            'label': 'Blue'
        },
    ]

# CKEDITOR_5_CUSTOM_CSS = 'path_to.css' # optional
CKEDITOR_5_FILE_STORAGE = "django.core.files.storage.FileSystemStorage" # optional
CKEDITOR_5_CONFIGS = {
    'default': {
        'toolbar': ['heading', '|', 'bold', 'italic', 'link',
                    'bulletedList', 'numberedList', 'blockQuote', 'imageUpload', ],

    },

    'comment': {
        'toolbar': ['heading', '|', 'bold', 'italic', 'link',
        'bulletedList', 'numberedList', 'blockQuote', 'imageUpload',
        'highlight', 'horizontalLine', 'link','code', 'codeBlock'  ],
    },

    'extends': {
        'blockToolbar': [
            'paragraph', 'heading1', 'heading2', 'heading3',
            '|',
            'bulletedList', 'numberedList',
            '|',
            'blockQuote',
        ],
        'toolbar': ['heading', '|', 'outdent', 'indent', '|','SpecialCharacters', 'bold', 'italic', 'underline', 'strikethrough',
         '|', 'alignment', 'fontSize', 'fontFamily', 'fontColor', 'fontBackgroundColor','highlight', 'horizontalLine', 'link','code','subscript', 'superscript',  '|', 'codeBlock', 'sourceEditing', 'insertImage',
                    'bulletedList', 'numberedList', 'todoList', '|',  'blockQuote', 'imageUpload', 'mediaEmbed', 'removeFormat',
                    'insertTable', '|', 'undo', 'redo' ],
                    
        'image': {
            'toolbar': ['imageTextAlternative', '|', 'imageStyle:alignLeft',
                        'imageStyle:alignRight', 'imageStyle:alignCenter', 'imageStyle:side',  '|'],
            'styles': [
                'full',
                'side',
                'alignLeft',
                'alignRight',
                'alignCenter',
            ]

        },
        
        # !!!!!!!! - mediaEmbed - enable previews in data  !!!!!!!!
        'mediaEmbed': {
            'previewsInData': True  # Enable previews in data  !!!!!!!!
        },
        # !!!!!!!!

        'table': {
            'contentToolbar': [ 'tableColumn', 'tableRow', 'mergeTableCells',
            'tableProperties', 'tableCellProperties' ],
            'tableProperties': {
                'borderColors': customColorPalette,
                'backgroundColors': customColorPalette
            },
            'tableCellProperties': {
                'borderColors': customColorPalette,
                'backgroundColors': customColorPalette
            }
        },
        'heading' : {
            'options': [
                { 'model': 'paragraph', 'title': 'Paragraph', 'class': 'ck-heading_paragraph' },
                { 'model': 'heading1', 'view': 'h1', 'title': 'Heading 1', 'class': 'ck-heading_heading1' },
                { 'model': 'heading2', 'view': 'h2', 'title': 'Heading 2', 'class': 'ck-heading_heading2' },
                { 'model': 'heading3', 'view': 'h3', 'title': 'Heading 3', 'class': 'ck-heading_heading3' }
            ]
        },
        
    },
    'list': {
        'properties': {
            'styles': 'true',
            'startIndex': 'true',
            'reversed': 'true',
        }
    },

    

        'full': {  # 🔥 Plná konfigurácia (všetky nástroje)
        'toolbar': [
            'heading', '|', 'bold', 'italic', 'underline', 'strikethrough',
            'subscript', 'superscript', '|', 'link', 'imageUpload', 'blockQuote',
            'code', 'codeBlock', '|', 'bulletedList', 'numberedList', 'outdent', 'indent',
            '|', 'alignment', 'horizontalLine', 'table', '|', 'undo', 'redo'
        ],
        'image': {
            'toolbar': ['imageTextAlternative', 'imageStyle:full', 'imageStyle:side']
        },
        'table': {
            'contentToolbar': ['tableColumn', 'tableRow', 'mergeTableCells']
        },
        'language': 'en',
    }
}

# Define a constant in settings.py to specify file upload permissions
CKEDITOR_5_FILE_UPLOAD_PERMISSION = "any"  # Possible values: "staff", "authenticated", "any"

# possible values: "custom_upload_file"
# CK_EDITOR_5_UPLOAD_FILE_VIEW_NAME = "custom_upload_file"

"""
but then we need to add this to urls.py - path("upload/", custom_upload_function, name="custom_upload_file"),
"""