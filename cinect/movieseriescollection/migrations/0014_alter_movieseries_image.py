# Generated by Django 3.2.9 on 2021-12-04 22:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('movieseriescollection', '0013_alter_movieseries_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='movieseries',
            name='image',
            field=models.ImageField(upload_to='media/images'),
        ),
    ]
