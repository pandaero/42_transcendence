import { getCookie } from "./utils.js";
import { validateEmail} from "./utils.js";

document.addEventListener('DOMContentLoaded', (event) => {
	document.getElementById('loginForm').addEventListener('submit', function(e) {
		e.preventDefault();
		const email = document.getElementById('email').value;
		const password = document.getElementById('password').value;

		login(email, password);
	});
});

function login(email, password){
	let errormsg = document.getElementById("errorMsg");

	if (email == ""){
		errormsg.textContent = 'Email is required.';
		return;
	}

	if(!validateEmail(email)){
		errormsg.textContent = 'Invalid email.';
		return;
	}

	if(password == ""){
		errormsg.textContent = 'Password is required.';
		return;
	}

	let data = {
		"email": email,
		"password": password
	}
	console.log(JSON.stringify(data));
	fetch('/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'X-CSRFToken': getCookie('csrftoken')
		},
		body: JSON.stringify(data)
	})
	.then(response => response.json())
	.then(data => {
		if (data.status == "success"){
			window.location.href = "/";
		} else {
			errormsg.textContent = 'Invalid email or password.';
		}
	})

}