from django.db import models
from django.contrib.auth.models import User
from django.utils.translation import gettext_lazy as _


MEDIA_TYPES = (
    ('MOVIE', _('Movie')),
    ('TV', _('TV Show')),
    ('BOOK', _('Book'))
)


class LibrosProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, default=None)
    friends = models.ManyToManyField('LibrosProfile', blank=True)

    def __str__(self):
        return f'{self.user.username}'


class Media(models.Model):
    title = models.TextField(max_length=100)
    author = models.TextField(max_length=100)
    media_type = models.CharField(choices=MEDIA_TYPES, default='MOVIE', max_length=5, blank=False,
                                  null=False)
    year = models.IntegerField(default=-1, blank=False, null=False)
    # poster = models.ImageField()

    def __str__(self):
        return f'{self.media_type}: {self.title} ({self.year})'


class Rating(models.Model):
    media = models.ForeignKey(Media, on_delete=models.DO_NOTHING)
    user = models.ForeignKey(LibrosProfile, on_delete=models.DO_NOTHING, default=None)
    stars = models.IntegerField(default=0)

    def __str__(self):
        return f'{self.user}: {self.media}, {self.stars} Stars'
