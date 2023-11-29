import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from auth_app.models import AppUser

def create_superuser():
	username = os.getenv('DB_USER')
	password = os.getenv('DB_PASSWORD')
	email = os.getenv('DB_USER') + '@whateva.com'

	if not AppUser.objects.filter(username=username).exists():
		AppUser.objects.create_superuser(email, username, password)
		print(f"Superuser {username} created")
	else:
		print(f"Superuser {username} already exists")

if __name__ == '__main__':
	create_superuser()