from django.db import models

# Create your models here.

class Products (models.Model):
    product_image = models.ImageField(upload_to = 'uploads/')
    product_name =  models.CharField(max_length=68)
    product_description = models.CharField(max_length=200)
    product_price  = models.DecimalField(max_digits=10, decimal_places=2)
    
    
