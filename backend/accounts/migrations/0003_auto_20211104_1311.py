# Generated by Django 3.2.7 on 2021-11-04 12:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_auto_20211104_1310'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='details',
            name='sampled_dt',
        ),
        migrations.AlterField(
            model_name='customuser',
            name='name',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='customuser',
            name='surname',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='details',
            name='date_of_birth',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]