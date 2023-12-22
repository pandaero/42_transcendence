from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth import authenticate, login as auth_login, views as auth_views
from django.contrib.auth.decorators import login_required
from django.core.files.base import ContentFile
from utils import validateEmail, validatePassword
from .models import AppUser
import base64
import uuid
import json
import sys

@login_required(login_url='login')
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

def settings_view(request):
	if request.method == 'GET':
		return render(request, 'settings.html')
	
	elif request.method == 'POST':
		data = json.loads(request.body)
		user_id = request.user.user_id
		user = AppUser.objects.get(user_id=user_id)

		try:
			if 'email' in data:
				new_email = data['email']
				user.email = new_email
				user.save()
		except:
			return JsonResponse({'status':'error', 'message':'Email already exists.'})

		try:
			if 'username' in data:
				new_username = data['username']
				user.username = new_username
				user.save()
		except:
			return JsonResponse({'status':'error', 'message':'Username already exists.'})

		if 'profile_picture' in data:
			imgstr = data['profile_picture']
			image_data = base64.b64decode(imgstr)
			
			filename = "{}.{}".format(uuid.uuid4(), 'jpg')
			user.profile_picture.save(filename, ContentFile(image_data), save=True)
			user.save()

		if 'password' in data:
			new_password = data['password']
			user.set_password(new_password)
			user.save()

		return JsonResponse({'status':'success', 'message':'Settings updated successfully.'})
	
	
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
