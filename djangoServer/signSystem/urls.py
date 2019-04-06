
from django.urls import path,include

from . import views

urlpatterns = [
    path(r'',views.index),
    path(r'index/',views.index),
    path(r'uploadcode/',views.uploadcode),
    path(r'login',views.login),
    path(r'register',views.register),
    path(r'useralreadyexist',views.userAlreadyExist),
]
