import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from django.contrib.auth.models import User

def create_superuser():
	username = os.getenv('DB_USER')
	password = os.getenv('DB_PASSWORD')
	email = os.getenv('DB_USER') + '@whateva.com'

	if not User.objects.filter(username=username).exists():
		User.objects.create_superuser(username, email, password)
		print(f"Superuser {username} created")
	else:
		print(f"Superuser {username} already exists")

if __name__ == '__main__':
	create_superuser()