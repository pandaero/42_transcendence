function validateEmail(email){
	let rgex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
	return rgex.test(email);
}

function validatePassword(password){
	let rgex = /^[a-zA-Z0-9]+$/;
	return rgex.test(password);
}

function register(){
	let email = document.getElementById("email").value;
	let username = document.getElementById("username").value;
	let password = document.getElementById("password").value;
	let errormsg = document.getElementById("errorMsg");

	if (!validateEmail(email)){
		errormsg.textContent = 'Invalid email.';
		return;
	}

	let user_regx = /^[a-zA-Z0-9]+$/;
	if (!user_regx.test(username)){
		errormsg.textContent= 'Invalid username.';
		return;
	}

	if (!validatePassword(password)){
		errormsg.textContent = 'Password must have at least 1 capital letter and 1 special character.';
	}

	let data = {
		"email": email,
		"username": username,
		"password": password
	}
	console.log(JSON.stringify(data));

	fetch('/register', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'X-CSRFToken': getCookie('csrftoken')
		},
		body: JSON.stringify(data)
	})
	.then(response => response.json())
	.then(data => {
		if (data.success){
			window.location.href = '/login';
		} else {
			errormsg.textContent = data.message;
		}
	})
}

function getCookie(name){
	let cookieValue = null;
	if (document.cookie && document.cookie !== ''){
		const cookies = document.cookie.split(';');
		for (let i = 0; i < cookies.length; i++){
			const cookie = cookies[i].trim();
			if (cookie.substring(0, name.length + 1) === (name + '=')){
				cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
				break;
			}
		}
	}
	return cookieValue;
}