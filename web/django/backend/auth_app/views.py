from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth import authenticate, login as auth_login
from django.contrib.auth import views as auth_views
from utils import validateEmail, validatePassword
from .models import AppUser
import json

def index_view(request):
	return render(request,'index.html')

def login_view(request):
	if request.method == 'GET':
		return render(request, 'login.html')

	elif request.method == 'POST':
		try:
			data = json.loads(request.body)
		except Exception as e:
			print(request.body)
			return JsonResponse({'status':'error', 'message':str(request.body)})
		email = data['email']
		password = data['password']

		if not validateEmail(email):
			return JsonResponse({'status':'error', 'message':'Invalid Email.'})

		if password is None:
			return JsonResponse({'status':'error', 'message':'Password is required.'})

		user = authenticate(request, email=email, password=password)
		if user is not None:
			auth_login(request, user)
			return JsonResponse({'status':'success'})
		else:
			return JsonResponse({'status':'error', 'message': "Invalid credentials."})

def register_view(request):
	if request.method == 'GET':
		return render(request, 'register.html')

	elif request.method == 'POST':
		data = json.loads(request.body)
		if not validateEmail(data['email']) and not validatePassword(data['password']):
			return JsonResponse({'status':'error', 'message':'Invalid Email or password.'})
	try:
		user = AppUser.objects.create_user(
			email=data['email'],
			password=data['password']
		)
		return JsonResponse({'status':'success', 'message':'User created successfully.'})
	except Exception as e:
		return JsonResponse({'status':'error', 'message':str(e)})


class CustomPasswordResetView(auth_views.PasswordResetView):
	template_name = 'password_reset_form.html'
# 
class CustomPasswordResetDoneView(auth_views.PasswordResetDoneView):
	template_name = 'password_reset_done.html'
# 
class CustomPasswordResetConfirmView(auth_views.PasswordResetConfirmView):
	template_name = 'password_reset_confirm.html'
# 
class CustomPasswordResetCompleteView(auth_views.PasswordResetCompleteView):
	template_name = 'password_reset_complete.html'
# 
