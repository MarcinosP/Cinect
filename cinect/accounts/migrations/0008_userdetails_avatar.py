# Generated by Django 3.2.9 on 2021-12-04 23:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0007_friendlist'),
    ]

    operations = [
        migrations.AddField(
            model_name='userdetails',
            name='avatar',
            field=models.ImageField(default=1, upload_to='avatars'),
            preserve_default=False,
        ),
    ]