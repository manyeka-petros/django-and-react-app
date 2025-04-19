from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from .serializer import ProductSerializer
from .models import Products



class SendAndGetProduct(APIView):
    
    def get(self,request):
        produ = Products.objects.all()
        serialize = ProductSerializer(produ, many = True)
        return Response(serialize.data)
    def post(self,request):
        serialize = ProductSerializer(data = request.data)
        if serialize.is_valid():
            serialize.save()
            return Response(serialize.data)
        return Response(serialize.errors)
    
    