import { getCookie } from "./utils.js";


var acceptButtons = document.querySelectorAll('.accept-button');
var declineButtons = document.querySelectorAll('.decline-button');
var addFriendButtons = document.querySelectorAll('.add_friend-button');
let successMsg = document.getElementById('successMsg');
let successSentMsg = document.getElementById('friend-request-sent');
let alreadySentMsg = document.getElementById('alreadySent');
let declineMsg = document.getElementById('declineMsg');

function handleSubmit(event, button){
	event.preventDefault();
	console.log("inside function");
	var form = event.target.closest('form');
	var formData = new FormData(form);

	var user_id = button.getAttribute('data-user-id');
	console.log("user_id: ", user_id);
	formData.append('user_id', user_id);

	var jsonObject = {};
	formData.forEach(function(value,key){
		jsonObject[key] = value;
	})


	var fetchOptions = {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'X-CSRFToken': getCookie('csrftoken')
		},
		body: JSON.stringify(jsonObject),
	};
	try{
		console.log(form.action);
		console.log(fetchOptions);
		fetch(form.action, fetchOptions)
		.then(respone => respone.json())
		.then(data => {
			console.log(data.status);
			if (data.status === "success"){
				if (data.message === 'Friend request sent successfully.'){
					alreadySentMsg.textContent= "";
					successSentMsg.textContent = data.message;
					successMsg.textContent = "";
					declineMsg.textContent = "";
				}
				else if (data.message === 'Friend request declined.'){
					alreadySentMsg.textContent= "";
					successSentMsg.textContent = "";
					successMsg.textContent = "";
					declineMsg.textContent = data.message;

				}
				else{
					alreadySentMsg.textContent = "";
					successSentMsg.textContent = "";
					successMsg.textContent = data.message;
					declineMsg.textContent = "";
				}
			}
			else if (data.status === "error" && data.message === "Friend request already sent."){
				alreadySentMsg.textContent = data.message;
				successSentMsg.textContent = "";
				successMsg.textContent = "";
				declineMsg.textContent = "";
			}
		})
	}
	catch(e){
		declineMsg.textContent = "Friend request already declined.";
	}
};

acceptButtons.forEach(function(button){
	button.addEventListener('click', function(event) {
		console.log("1");
		handleSubmit(event, button);
	});
});

declineButtons.forEach(function(button){
	button.addEventListener('click', function(event) {
		console.log("2");
		handleSubmit(event, button);
	});
});

addFriendButtons.forEach(function(button){
	button.addEventListener('click', function(event) {
		console.log("3");
		handleSubmit(event, button);
	});
});