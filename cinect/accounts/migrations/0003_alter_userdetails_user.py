# Generated by Django 3.2.9 on 2021-11-20 16:10

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('accounts', '0002_rename_dato_of_birth_userdetails_date_of_birth'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userdetails',
            name='user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='deatils', to=settings.AUTH_USER_MODEL),
        ),
    ]
