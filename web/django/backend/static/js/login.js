import { getCookie } from "./utils.js";
import { validateEmail} from "./utils.js";

console.log("login.js loaded");

let loginBtn = document.getElementById('loginBtn');
if (loginBtn) {
	console.log("login button pressed");
	let form = document.getElementById('loginForm');
	loginBtn.addEventListener('click', function(e) {
		console.log("login button clicked");
		let email = document.getElementById("email").value;
		let password = document.getElementById("password").value;
		login(email, password);
	});
};


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
	fetch('/login_view2', {
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
			history.pushState( {Profile: true }, 'Profile page', '/profile');
			changeURL('/profile', 'Profile page', {Profile: true });
		} else {
			errormsg.textContent = 'Invalid email or password.';
		}
	})

}