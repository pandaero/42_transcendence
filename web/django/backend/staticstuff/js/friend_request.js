import { getCookie } from "./utils.js";


document.addEventListener("DOMContentLoaded", function(e) {
	var acceptButtons = document.querySelectorAll('.accept-button');
	var declineButtons = document.querySelectorAll('.decline-button');
	var addFriendButtons = document.querySelectorAll('.add_friend-button');
	let successMsg = document.getElementById('successMsg');
	let successSentMsg = document.getElementById('friend-request-sent');
	let alreadySentMsg = document.getElementById('alreadySent');
	let declineMsg = document.getElementById('declineMsg');
	//NEED A NEW VARIABLE THAT STORES THE USER ID or FRIEND_REQUEST_ID SO THAT WE CAN PUT IT INTO THE JSON
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
	}

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
});