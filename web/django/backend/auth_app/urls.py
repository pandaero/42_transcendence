from django.urls import path
from . import views

urlpatterns = [
	path('', views.index),
	# to ask, maybe to put into SPA
	path('register', views.register),
]