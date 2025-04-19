from django.urls import path
from .views import SendAndGetProduct


urlpatterns = [
    path('',SendAndGetProduct.as_view())
]
