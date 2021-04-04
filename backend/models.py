from django.db import models


class Student(models.Model):
    name = models.CharField("Name", max_length=240)
    email = models.EmailField()
    document = models.CharField("Document", max_length=20)
    phone = models.CharField(max_length=20)
    registrationDate = models.DateField("Registration Date", auto_now_add=True)

    def __str__(self):
        return self.name

# this might need to extend models.CustomUser for JWT
class User(models.Model):
    # serve as UID
    email = models.EmailField()

    # profile options
    name = models.CharField("Name", max_length=250)
    bio = models.CharField("Bio", max_length=500)

    def __str__(self):
        return self.email

class Media(models.Model):
    title = models.CharField("Title", max_length=250)
    author = models.CharField("Author", max_length=250)
    description = models.CharField("Description", max_length=500)

    def __str__(self):
        return self.title


class Review(models.Model):
    media = models.ForeignKey(Media, on_delete=models.DO_NOTHING) # !! probably change this from DO_NOTHING 
    poster = models.ForeignKey(User, on_delete=models.DO_NOTHING)
    body = models.CharField("Body", max_length=500)
    rating = models.IntegerField(default=0)

    def __str__(self):
        return self.body