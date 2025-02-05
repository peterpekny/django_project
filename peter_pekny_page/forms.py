from django import forms
from django_ckeditor_5.widgets import CKEditor5Widget




from .models import Article

class ArticleForm(forms.ModelForm):
    """Formulár pre pridávanie a úpravu článkov."""

    class Meta:
        model = Article
        fields = ['title', 'content', 'visibility']
        widgets = {
            'content': CKEditor5Widget(config_name='default'),
            'visibility': forms.Select(choices=Article.VISIBILITY_CHOICES)
        }


from .models import Comment

class CommentForm(forms.ModelForm):
      """Form for comments to the article."""

      def __init__(self, *args, **kwargs):
          super().__init__(*args, **kwargs)
          self.fields["text"].required = False

      class Meta:
          model = Comment
          fields = ("author", "text")
          widgets = {
              "text": CKEditor5Widget(
                  attrs={"class": "django_ckeditor_5"}, config_name="comment"
              )
          }