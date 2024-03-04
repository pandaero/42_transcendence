from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth import authenticate, login as auth_login, views as auth_views
from django.core.files.base import ContentFile
from utils import validateEmail, validatePassword, validateUsername
from .models import AppUser, FriendRequest
import base64
import uuid
import json
import sys

def eprint(*args, **kwargs):
	print(*args, file=sys.stderr, **kwargs)

def header_view(request):
	return render(request,'header.html')
	


def game(request):
	return render(request,'game.html')

def profile(request, **args):
	if args :
		if request.user.is_authenticated:
			friendUser  = AppUser.objects.get(user_id=args['user_id'])

			eprint(friendUser)
			if request.user.friends.filter(email=friendUser.email).exists():
				friend_game_history = friendUser.get_game_history()[:5]
				games_history = []
				for game in friend_game_history:
					winner = game.player_one.username if game.player_one_score > game.player_two_score else game.player_two.username 
					tie = True if game.player_one_score == game.player_two_score else False
					games_history.append({
						'game_id': game.game_id,
						'game_date': game.game_date,
						'player_one': game.player_one.username,
						'player_one_score': game.player_one_score,
						'player_two': game.player_two.username,
						'player_two_score': game.player_two_score,
						'winner': winner,
						'tie': tie
					})
				friendUserStats = {
					'profile_picture': friendUser.profile_picture.url,
					'games_played': friendUser.games,
					'wins': friendUser.wins,
					'losses': friendUser.losses,
					'draws': friendUser.draws,
					'games_history': games_history
					}
				return JsonResponse({"status": "success", 'stats': friendUserStats})
			else:
				return JsonResponse({"status": "error", 'message':'You are not friends with this user.'})
		return JsonResponse({"status": "error", 'message':'You must be logged in to view this page.'})
	else:
		return render(request, 'profile.html')


def history(request):

	return render(request, 'history.html')


def main(request):
	return render(request, 'main.html')

def about(request):
	return render(request, 'about.html')


def game_result(request):
	return JsonResponse({'status':'success'})

def login_view(request):
	if request.method == 'GET':
		return render(request, 'login.html')
	if request.method == 'POST':
		try:
			data = json.loads(request.body)
		except Exception as e:
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
	if request.method == 'POST':
		data = json.loads(request.body)
		if not validateEmail(data['email']) and not validatePassword(data['password']):
			return JsonResponse({'status':'error', 'message':'Invalid Email or password.'})
		if not validateUsername(data['username']):
			return JsonResponse({'status': 'error', 'message':'Username not valid'})
		try:
			user = AppUser.objects.create_user(
				email=data['email'],
				username = data['username'],
				password=data['password']
			)
			return JsonResponse({'status':'success', 'message':'Account created successfully.'})
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

def friends_view(request):
	if request.method == 'GET':
		friend_requests = FriendRequest.objects.filter(receiver=request.user)
		exclude_users = friend_requests.values_list('sender', flat=True)
		users = AppUser.objects.exclude(user_id__in=exclude_users)
		return render (request, 'friends.html', {'users': users, 'friend_requests' : friend_requests})

def send_friend_request_view(request, user_id):
	if request.method == 'POST':
		from_user = request.user
		to_user = AppUser.objects.get(user_id=user_id)

		friend_requests, created = FriendRequest.objects.get_or_create(sender=from_user, receiver=to_user)
		if created:
			return JsonResponse({'status':'success', 'message':'Friend request sent successfully.'})
		else:
			return JsonResponse({'status':'error', 'message':'Friend request already sent.'})
	
def accept_friend_request_view(request, friend_request_id):
	if request.method == 'POST':
		try:
			friend_request = FriendRequest.objects.get(id=friend_request_id)
		except:
			return JsonResponse({'status':'error', 'message':'An error occurred accepting the friend request.'})

		if friend_request.receiver == request.user:
			friend_request.accept()
			friend_request.delete()
			return JsonResponse({'status':'success', 'message':'Friend request accepted successfully.'})

def decline_friend_request_view(request, friend_request_id):
	if request.method == 'POST':
		try:
			friend_request = FriendRequest.objects.get(id=friend_request_id)
		except:
			return JsonResponse({'status': 'error', 'message':'An error occurred declining the friend request.'})

		if friend_request.receiver == request.user:
			friend_request.delete()
			return JsonResponse({'status': 'success', 'message':'Friend request declined.'})

def getUserData_view(request):
	if request.user.is_authenticated:
		user_data = {
			'authenticated': True,
			'email' : request.user.email,
			'username' : request.user.username,
			'profile_picture' : request.user.profile_picture.url
		}
	else:
		user_data = {'authenticated': False}
	return JsonResponse({'user': user_data})

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