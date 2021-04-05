from django.db import models


class LibrosProfile(models.Model):
    pass


class Media(models.Model):
    title = models.TextField(max_length=100)
    author = models.TextField(max_length=100)
    poster = models.ImageField()


class Rating(models.Model):
    media = models.ForeignKey(Media, on_delete=models.DO_NOTHING)
    stars = models.IntegerField(default=0)


class Student(models.Model):
    name = models.CharField("Name", max_length=240)
    email = models.EmailField()
    document = models.CharField("Document", max_length=20)
    phone = models.CharField(max_length=20)
    registrationDate = models.DateField("Registration Date", auto_now_add=True)

    def __str__(self):
        return self.name