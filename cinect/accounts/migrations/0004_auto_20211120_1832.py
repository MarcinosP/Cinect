# Generated by Django 3.2.9 on 2021-11-20 17:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0003_alter_userdetails_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='userdetails',
            name='fav_movie',
            field=models.CharField(default=1, max_length=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='userdetails',
            name='fav_series',
            field=models.CharField(default=1, max_length=100),
            preserve_default=False,
        ),
    ]
