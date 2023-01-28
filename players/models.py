from django.db import models

class Player(models.Model):
    name = models.CharField(max_length=16)
    team = models.CharField(max_length=200)