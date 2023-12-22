from django.urls import path
from django.contrib.auth import views as auth_views
from . import views

urlpatterns = [
	path('', views.index_view, name='index'),
	path('register', views.register_view, name='register'),
	path('login', views.login_view, name='login'),
	path('logout', auth_views.LogoutView.as_view(), name='logout'),
	path('settings', views.settings_view, name='settings'),
	path('password_reset', views.CustomPasswordResetView.as_view(), name='password_reset'),
	path('password_reset_done', views.CustomPasswordResetDoneView.as_view(), name='password_reset_done'),
	path('reset/<uidb64>/<token>', views.CustomPasswordResetConfirmView.as_view(), name='password_reset_confirm'),
	path('reset/done', views.CustomPasswordResetCompleteView.as_view(), name='password_reset_complete'),
]