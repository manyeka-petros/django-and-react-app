from django.shortcuts import render
from rest_framework import status

# Create your views here.


from django.http import HttpResponse

from rest_framework.views  import  APIView
from .models import AppUser
from .serializer import AppUserSerializer
from rest_framework.response import Response
from django.shortcuts import get_object_or_404


def shows(request):
    return HttpResponse("hello manyeka")

class  UserActions(APIView):
    def  get(self,request):
        user_infor = AppUser.objects.all()
        serialize = AppUserSerializer(user_infor, many = True)
        return Response(serialize.data)
    
    def post(self, request):
        serialize = AppUserSerializer(data  = request.data)
        if serialize.is_valid():
             serialize.save()
             return Response(serialize.data)
        return Response(serialize.errors)
    
class AppUserDetails(APIView):
    def delete(self, request, pk):
        use = get_object_or_404(AppUser,pk=pk)
        use.delete()
        return Response(status = status.HTTP_204_NO_CONTENT)
    
    def put(self,request,pk):
        use = get_object_or_404(AppUser,pk=pk)
        serialize = AppUserSerializer(use, data = request.data)
        if serialize.is_valid():
            serialize.save()
            return Response(serialize.data)
        return Response(serialize.errors, status = status.HTTP_401_BAD_REQUEST)
        
            