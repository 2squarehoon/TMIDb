from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    user_or_critic = models.IntegerField()
    foreign_or_domestic = models.IntegerField()
