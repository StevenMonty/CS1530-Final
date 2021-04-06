from django.db.models.signals import post_save
from django.contrib.auth.models import User
from django.dispatch import receiver
from django.db import models
from backend.models import LibrosProfile


@receiver(post_save, sender=User)
def create_libros_profile(sender, instance, created, **kwargs):
    """
        Creates a Libros profile model instance when a django User model is created
    """
    if created:
        LibrosProfile.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()
