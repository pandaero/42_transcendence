import { getCookie } from "./utils.js";
import { validateEmail } from "./utils.js";
import { validatePassword } from "./utils.js";

document.getElementById('settingsForm').addEventListener('submit', function(e) {
	e.preventDefault(); // Prevents the default form submit action
	const email = document.getElementById("email").value;
	const username = document.getElementById("username").value;
	const profile_picture = document.getElementById("profile_picture").files[0];
	const password = document.getElementById("password").value;
	const confirm_password = document.getElementById("confirm_password").value;

	settings(email, username, profile_picture, password, confirm_password);
})


async function settings(email, username, profile_picture, password, confirm_password) {
	let csrf_token = getCookie("csrftoken");
	let successMsg = document.getElementById("successMsg");
	let errorMsg = document.getElementById("errorMsg");
	let data = {};

	if (email !== "") {
	  if (!validateEmail(email)) {
		errorMsg.textContent = 'Invalid email.';
		return;
	  }
	  data.email = email;
	}
	
	if (username !== "") {
	  if (username.length < 5) {
		errorMsg.textContent = '';
		errorMsg.textContent = 'Username must be at least 5 characters long.';
		return;
	  } else {
		data.username = username;
	  }
	}

	if (password !== "") {
		if (!validatePassword(password)) {
			errorMsg.textContent = 'Password must be 8 characters long and have at least 1 capital letter and 1 special character.';
			return;
		}
		if (password !== confirm_password) {
			errorMsg.textContent = 'Passwords do not match.';
			return;
		}
		data.password = password;
	}
	
	if (profile_picture) {
		const validImageExtensions = ['jpg', 'jpeg', 'png', 'bmp'];
		const extension = profile_picture.name.split('.').pop().toLowerCase();
		
		if (!validImageExtensions.includes(extension)) {
		errorMsg.textContent = 'Invalid profile picture format. Allowed formats are jpg, jpeg, png, gif, bmp.';
		return;
		}
		try{
			const base64 = await new Promise((resolve, reject) => {
				const reader = new FileReader();
				reader.onload = function(e) {
					resolve(e.target.result.split(',')[1]);
				};
				reader.onerror = reject;
				reader.readAsDataURL(profile_picture);
				});
			data.profile_picture = base64;
		}catch (error){
			errorMsg.textContent = 'Error reading file: ' + error;
			return;
		}
	};

	try {
		const response = await fetch('/settings', {
		  method: 'POST',
		  headers: {
			'Content-Type': 'application/json',
			'X-CSRFToken': csrf_token
		  },
		  body: JSON.stringify(data)
		});
		const responseData = await response.json();

		if (responseData.status === "success") {
			errorMsg.textContent = '';
			successMsg.textContent = responseData.message;
		} else {
			errorMsg.textContent = responseData.message;
		}
	} catch (error) {
		errorMsg.textContent = 'Error updating settings: ' + error;
	}

}