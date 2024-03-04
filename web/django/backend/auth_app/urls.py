from django.urls import path
from django.contrib.auth import views as auth_views
from . import views

urlpatterns = [
	path('', views.header_view, name='index'),
	path('main.html', views.main, name='main'),
	path('register', views.header_view, name='register'),
	path('register/register.html', views.register_view, name='register_view'),
	path('register/form', views.register_view, name='register_view'),
	path('login', views.header_view, name='login'),
	path('login/login.html', views.login_view, name='login_view'),
	path('login_view', views.login_view, name='login_view_form'),
	path('logout', auth_views.LogoutView.as_view(), name='logout'),
	path('friends', views.header_view, name='friends'),
	path("friends/friends.html", views.friends_view, name="friends_view"),
	path('settings', views.header_view),
	path('settings/settings.html', views.settings_view, name='settings'),
	path('send_friend_request/<int:user_id>', views.send_friend_request_view, name='send_friend_request'),
	path('accept_friend_request/<int:friend_request_id>', views.accept_friend_request_view, name='accept_friend_request'),
	path('decline_friend_request/<int:friend_request_id>', views.decline_friend_request_view, name='decline_friend_request'),
	path('password_reset', views.CustomPasswordResetView.as_view(), name='password_reset'),
	path('password_reset_done', views.CustomPasswordResetDoneView.as_view(), name='password_reset_done'),
	path('reset/<uidb64>/<token>', views.CustomPasswordResetConfirmView.as_view(), name='password_reset_confirm'),
	path('reset/done', views.CustomPasswordResetCompleteView.as_view(), name='password_reset_complete'),
	path('main', views.header_view),
	path('profile', views.header_view),
	path('profile/profile.html', views.profile),
	path("profile/<int:user_id>", views.profile, name="getFriendStats_view"),
	path('history', views.header_view),
	path('history/history.html', views.history),
	path('settings', views.header_view,),
	path('settings/settings.html', views.settings_view),
	path('about', views.header_view),
	path('about/about.html', views.about),
	path('getUserData', views.getUserData_view, name='fetch_user_data')
]