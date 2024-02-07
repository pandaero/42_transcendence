import { getCookie } from "./utils.js";


let acceptButtons;
let declineButtons;
let addFriendButtons;
let successMsg;
let successSentMsg;
let alreadySentMsg;
let declineMsg;


export function init() {
	acceptButtons = document.querySelectorAll('.accept-button');
	declineButtons = document.querySelectorAll('.decline-button');
	addFriendButtons = document.querySelectorAll('.add_friend-button');
	successMsg = document.getElementById('successMsg');
	successSentMsg = document.getElementById('friend-request-sent');
	alreadySentMsg = document.getElementById('alreadySent');
	declineMsg = document.getElementById('declineMsg');

	acceptButtons.forEach(function(button){
		button.addEventListener('click', function(event) {
			handleSubmit(event, button);
		});
	});
	
	declineButtons.forEach(function(button){
		button.addEventListener('click', function(event) {
			handleSubmit(event, button);
		});
	});
	
	addFriendButtons.forEach(function(button){
		button.addEventListener('click', function(event) {
			handleSubmit(event, button);
		});
	});
};


export function unload(){
	return new Promise((resolve, reject) => {

		successMsg = null;
		successSentMsg = null;
		alreadySentMsg = null;
		declineMsg = null;

		if (acceptButtons) {
			acceptButtons.forEach(function(button){
				button.removeEventListener('click', handleSubmit);
			})};
		if (declineButtons){
			declineButtons.forEach(function(button){
				button.removeEventListener('click', handleSubmit);
			})};
		if (addFriendButtons){
			addFriendButtons.forEach(function(button){
				button.removeEventListener('click', handleSubmit);
			});

		} else {
			// Reject the promise if the login button is not found
			reject(new Error("accept button not found"));
		}
		acceptButtons = null;
		declineButtons = null;
		addFriendButtons = null;
	})};

function handleSubmit(event, button){
	event.preventDefault();
	var form = event.target.closest('form');
	var formData = new FormData(form);

	var user_id = button.getAttribute('data-user-id');
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
		fetch(form.action, fetchOptions)
		.then(respone => respone.json())
		.then(data => {
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
