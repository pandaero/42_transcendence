from django.urls import path
from django.contrib.auth import views as auth_views
from . import views

urlpatterns = [
	path('', views.index_view, name='index'),
	path('main.html', views.main, name='main'),
	path('register', views.index_view, name='register'),
	path('register/register.html', views.register_view, name='register_view'),
	path('register/form', views.register_form, name='register_view'),
	path('login', views.index_view, name='login'),
	path('login/login.html', views.login_view, name='login_view'),
	path('login_view2', views.login_view2, name='login'),
	path('logout', auth_views.LogoutView.as_view(), name='logout'),
	path('password_reset', views.CustomPasswordResetView.as_view(), name='password_reset'),
	path('password_reset_done', views.CustomPasswordResetDoneView.as_view(), name='password_reset_done'),
	path('reset/<uidb64>/<token>', views.CustomPasswordResetConfirmView.as_view(), name='password_reset_confirm'),
	path('reset/done', views.CustomPasswordResetCompleteView.as_view(), name='password_reset_complete'),
	path('main', views.index_view),
	path('game', views.index_view),
	path('game/result', views.game_result),
	path('game/game.html', views.game),
	path('profile', views.index_view),
	path('profile/profile.html', views.profile),
	path('history', views.index_view),
	path('history/history.html', views.history),
	path('settings', views.index_view,),
	path('settings/settings.html', views.settings),
	path('about', views.index_view),
	path('about/about.html', views.about),
]