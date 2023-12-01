import re

regex = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b'

def validateEmail(email):
	if (re.fullmatch(regex, email)):
		return True
	return False

def validatePassword(password):
	if len(password) < 8 and not re.search("[a-z]", password):
		return False
	if not re.search("[A-Z]", password):
		return False
	if not re.search("[0-9]", password):
		return False
	if not re.search("[!@#$%^&*]", password):
		return False
	return True

