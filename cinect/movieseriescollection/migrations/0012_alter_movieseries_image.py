# Generated by Django 3.2.9 on 2021-12-04 21:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('movieseriescollection', '0011_auto_20211204_2220'),
    ]

    operations = [
        migrations.AlterField(
            model_name='movieseries',
            name='image',
            field=models.FileField(blank=True, null=True, upload_to='uploads/movieseriesimage/%Y/%m/%d/'),
        ),
    ]
