# Generated by Django 4.2.7 on 2024-02-26 18:57

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('auth_app', '0010_appuser_last_login'),
    ]

    operations = [
        migrations.AddField(
            model_name='history',
            name='game_date',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]