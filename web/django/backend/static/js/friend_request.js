import { getCookie } from "./utils.js";


let acceptButtons;
let declineButtons;
let addFriendButtons;
let successMsg;
let successSentMsg;
let alreadySentMsg;
let declineMsg;

let clickEvent;
let div;

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

	const userDetailsList = document.querySelectorAll('.user-details');

	clickEvent =userDetailsList.forEach(function(userDetails){
		const user_id = userDetails.querySelector('.user_id').getAttribute('data-user-id');
		userDetails.addEventListener('click', function(event) {
			const userInfo = userDetails.querySelector('.user-info');
			if (userInfo.style.display === 'none') {
					fetchUserData(user_id).then(responseData => {
					userInfo.innerHTML = '';
					userInfo.appendChild(friend_details(responseData));
					userInfo.style.display = 'block';
				})
			} else {

				userInfo.style.display = 'none';
			}
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
		if (clickEvent){
			clickEvent.forEach(function(clickEvent){
				clickEvent.removeEventListener('click')});
		}
		} else {
			// Reject the promise if the login button is not found
			reject(new Error("accept button not found"));
		}
		acceptButtons = null;
		declineButtons = null;
		addFriendButtons = null;
		div = null;

		resolve();
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

async function fetchUserData(user_id){
	try {
		const response = await fetch(`/profile/${user_id}`);
		const responseData = await response.json();
		if (responseData.status === "error"){
			throw new Error(responseData.message);
		}
		return responseData;
	} catch (error){
		console.error('Error fetching user data: ', error);
		return null;
	}
}

function friend_details(data){
	div = document.createElement('div');
	let stats = data.stats;
	let games_history = stats.games_history;
	div.innerHTML = `
		<img src="${stats.profile_picture}" class="rounded-circle" width="100" height="100">
		<ul>
			<li> games played: ${stats.games_played}</li>
			<li> wins: ${stats.wins} </li>
			<li> losses: ${stats.losses} </li>
			<li> draws: ${stats.draws} </li>
			<span> Recent Games: </span>
			${games_history ? games_history.slice(0, 5).map(game => 
					`<ul>
						<li>Game date: ${game.game_date}</li>
						<li>Opponets: ${game.player_one} vs ${game.player_two}</li>
						<li>Final Score: ${game.player_one_score} : ${game.player_two_score}</li>
						<li><a>Final Result: ${game.tie? "Tie" : "Winner: " + game.winner}</a></li>
					</ul>
					`
				).join('') : 'No games played yet.'}
		</ul>
	`;
	return div;
}