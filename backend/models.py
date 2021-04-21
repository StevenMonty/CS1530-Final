from django.db import models
from django.contrib.auth.models import User
from django.utils.translation import gettext_lazy as _
from django.forms.models import model_to_dict
import json


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

    @property
    def details(self):
        details = {
            'id'         : self.id,
            'first_name' : self.user.first_name,
            'last_name'  : self.user.last_name,
            'username'   : self.user.username,
            'email'      : self.user.email,
            'last_active': self.user.last_login,
            'friend_count': self.friends.count(),
            'lib_size': len(self.library),
        }
        return details

    @property
    def friends_list(self):
        friend_list = []
        for f in self.friends.all():
            friend_list.append({
                'id': f.id,
                'first_name': f.user.first_name,
                'last_name': f.user.last_name,
                'email': f.user.email,
                'last_active': f.user.last_login,
            })

        return friend_list

    @property
    def library(self):
        lib = []
        ratings = Rating.objects.filter(user=self).all()
        for r in ratings:
            lib.append({
                'title': r.media.title,
                'author': r.media.author,
                'type': r.media.media_type,
                'rating': r.stars,
            })
        return lib


class Media(models.Model):
    title = models.TextField(max_length=100)
    author = models.TextField(max_length=100)
    media_type = models.CharField(choices=MEDIA_TYPES, default='MOVIE', max_length=5, blank=False,
                                  null=False)
    year = models.IntegerField(default=-1, blank=False, null=False)
    # poster = models.ImageField()

    def __str__(self):
        return f'{self.media_type}: {self.title} ({self.year})'

    @property
    def num_ratings(self):
        return Rating.objects.filter(media=self).count()


class Rating(models.Model):
    media = models.ForeignKey(Media, on_delete=models.DO_NOTHING)
    user = models.ForeignKey(LibrosProfile, on_delete=models.DO_NOTHING, default=None)
    stars = models.IntegerField(default=0)

    def __str__(self):
        return f'{self.user}: {self.media}, {self.stars} Stars'

