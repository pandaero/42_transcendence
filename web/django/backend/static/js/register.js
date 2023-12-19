import { validateEmail, validatePassword } from "./utils.js";
import { getCookie } from "./utils.js";

console.log("register.js loaded");

let registerBtn = document.getElementById('registerButton');

if (registerBtn) {
	console.log("register button pressed");
	let form = document.getElementById('registerForm');
	registerBtn.addEventListener('click', function(e) {
	console.log("register button clicked");
	let email = document.getElementById("email").value;
	let password = document.getElementById("password").value;
	register(email, password);
});
}


function register(email, password){
	// e.preventDefault();
	console.log("almost at fetch");
	let errormsg = document.getElementById("errorMsg");
	let successmsg = document.getElementById("successMsg");
	
		if (!validateEmail(email)){
			errormsg.textContent = 'Invalid email.';
			return;
		}

		// let user_regx = /^[a-zA-Z0-9]+$/;

		if (!validatePassword(password)){
			errormsg.textContent = 'Password must contain\n8 characters, 1 capital letter, 1 lowercase and 1 special character.';
			return;
		}
		let data = {
			"email": email,
			"password": password
		}
		fetch('/register/form', {
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
				errormsg.textContent = '';
				successmsg.textContent = 'Account created successfully.';
			} else {
				successmsg.textContent = '';
				errormsg.textContent = 'Email or username already exists.';
			}
		})
}
