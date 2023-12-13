from django.shortcuts import render
from django.http import JsonResponse
from django.http import Http404
from django.contrib.auth.hashers import make_password
from django.views.decorators.csrf import csrf_exempt
from utils import validateEmail, validatePassword
from .models import AppUser
import json
import sys

def eprint(*args, **kwargs):
	print(*args, file=sys.stderr, **kwargs)

def index(request):
	return render(request,'index.html')

def game(request):
	return render(request,'game.html')

def profile(request):
	return render(request, 'profile.html')

def history(request):
	return render(request, 'history.html')

def settings(request):
	render(request, 'index.html')
	return render(request, 'settings.html')

def main(request):
	return render(request, 'main.html')

def about(request):
	eprint('Lets go')
	return render(request, 'about.html')

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

def view_user(request):
	if request.method == 'GET':
		data = json.loads(request.body)
		user = AppUser.objects.get(user_id=data['user_id'])
		return JsonResponse({'status':'success', 'user': user.to_dict()})
	else:
		return Http404

		
#api
