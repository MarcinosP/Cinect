# Generated by Django 3.2.9 on 2021-12-04 23:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('movieseriescollection', '0014_alter_movieseries_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='movieseries',
            name='image',
            field=models.ImageField(upload_to='images'),
        ),
    ]
