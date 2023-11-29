from django.db import models
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin

class AppUserManager(BaseUserManager):
    def create_user(self, email, username, password):
        if not email:
            raise ValueError('An email is required.')
        if not password:
            raise ValueError('A password is required.')
        email = self.normalize_email(email)
        user = self.model(email=email, username=username)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, password):
        user = self.create_user(email, username, password)
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self.db)
        return user

class AppUser(AbstractBaseUser, PermissionsMixin):
    user_id = models.AutoField(primary_key=True)
    email = models.EmailField(max_length=50, unique=True)
    username = models.CharField(max_length=30, unique=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    objects = AppUserManager()
    profile_picture = models.CharField(max_length=255, blank=True)
    friends = models.ManyToManyField('self', symmetrical=True, blank=True)
    games = models.IntegerField(blank=True, null=True)
    wins = models.IntegerField(blank=True, null=True)
    losses = models.IntegerField(blank=True, null=True)
    is_staff = models.BooleanField(default=False)
    def __str__(self):
        return self.email

    
    
class History(models.Model):
    game_id = models.AutoField(primary_key=True)
    player_one = models.CharField(blank=True, null=True)
    player_two = models.CharField(blank=True, null=True)
    player_one_score = models.IntegerField(blank=True, null=True)
    player_two_score = models.IntegerField(blank=True, null=True)

