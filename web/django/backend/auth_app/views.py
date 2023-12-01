from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth.hashers import make_password
from django.views.decorators.csrf import csrf_exempt
from utils import validateEmail, validatePassword
from .models import AppUser
import json

def index(request):
	return render(request,'index.html')

def register(request):
	print('hello world')
	print(request)
	if request.method == 'GET':
		return render(request, 'register.html')

	elif request.method == 'POST':
		print(request)
		data = json.loads(request.body)
		if not validateEmail(data['email']) and not validatePassword(data['password']):
			return JsonResponse({'status':'error', 'message':'Invalid Email or password.'})
	try:
		user = AppUser.objects.create_user(
			email=data['email'],
			username=data['username'],
			password=data['password']
		)
		return JsonResponse({'status':'success', 'user_id': user.user_id})
	except Exception as e:
		return JsonResponse({'status':'error', 'message':str(e)})

		
#api
