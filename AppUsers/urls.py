from django.urls import path

from .import views
from .views import UserActions,AppUserDetails



urlpatterns = [
    path('use/', UserActions.as_view()),
    path('use/<int:pk>/', AppUserDetails.as_view(),name='appuser_details'),
]
