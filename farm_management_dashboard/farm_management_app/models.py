from django.db import models
from datetime import date
from django.contrib.auth.models import User

# This is the database model for the app. It contains the following classes:


class Crop(models.Model):
    name = models.CharField(max_length=255)
    variety = models.CharField(max_length=255)
    planting_date = models.DateField()
    harvest_date = models.DateField()
    user_token = models.CharField(max_length=255, null=True)

class Employee(models.Model):
    name = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=15)
    position = models.CharField(max_length=255)
    salary = models.DecimalField(max_digits=10, decimal_places=2)
    performance = models.TextField()
    user_token = models.CharField(max_length=255, null=True)

class Livestock(models.Model):
    animal_type = models.CharField(max_length=255)
    tag_number = models.CharField(max_length=255, default='N/A')
    breed = models.CharField(max_length=255)
    age = models.IntegerField()
    weight = models.DecimalField(max_digits=10, decimal_places=2)
    purchase_date = models.DateField()
    purchase_price = models.DecimalField(max_digits=10, decimal_places=2)
    user_token = models.CharField(max_length=255, null=True)

    def calculate_age_in_months(self):
        today = date.today()
        purchase_month = (today.year - self.purchase_date.year) * 12 + today.month - self.purchase_date.month
        return purchase_month

class Machinery(models.Model):
    plate_number = models.CharField(max_length=255, default='N/A')
    equipment_name = models.CharField(max_length=255)
    purchase_price = models.DecimalField(max_digits=10, decimal_places=2)
    purchase_date = models.DateField()
    user_token = models.CharField(max_length=255, null=True)

class Income(models.Model):
    description = models.CharField(max_length=255)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField()
    user_token = models.CharField(max_length=255, null=True)

class Expenditure(models.Model):
    description = models.CharField(max_length=255)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField()
    user_token = models.CharField(max_length=255, null=True)
