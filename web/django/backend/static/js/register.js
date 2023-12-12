import { validateEmail, validatePassword } from "./utils.js";
import { getCookie } from "./utils.js";

document.addEventListener('DOMContentLoaded', (event) => {
	document.getElementById('registerForm').addEventListener('submit', function(e) {
		e.preventDefault(); // Prevents the default form submit action
		let email = document.getElementById("email").value;
		let password = document.getElementById("password").value;

		register(email, password);
	});
});

function register(email, password){
	let errormsg = document.getElementById("errorMsg");
	let successmsg = document.getElementById("successMsg");
	
		if (!validateEmail(email)){
			errormsg.textContent = 'Invalid email.';
			return;
		}

		// let user_regx = /^[a-zA-Z0-9]+$/;

		if (!validatePassword(password)){
			errormsg.textContent = 'Password must be 8 characters long and have at least 1 capital letter and 1 special character.';
			return;
		}

		let data = {
			"email": email,
			"password": password
		}

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
			if (data.status == "success"){
				successmsg.textContent = 'Account created successfully.';
			} else {
				errormsg.textContent = 'Email or username already exists.';
			}
		})
}
