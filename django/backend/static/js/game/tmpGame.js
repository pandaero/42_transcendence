import { getCookie } from "../utils.js";

let resultBtn = document.getElementById('resultBtn');

if(resultBtn){
	console.log("result button pressed");
	resultBtn.addEventListener('click', function(e) {
	let matchID = document.getElementById('matchId');
	let player1 = document.getElementById('playerId1').value;
	let p1Score = document.getElementById('score1').value;
	let player2 = document.getElementById('playerId2').value;
	let p2Score = document.getElementById('score2').value;

	function checkFields (player1, p1Score, player2, p2Score){
	
		if (player1 == player2 || p1Score == p2Score 
			|| player1 == "" || player2 == ""){
			alert("Invalid input. Player and Score must be different");
			return false;
		}
		return true;
	}
	if (!checkFields(player1, p1Score, player2, p2Score))
		return;
	alert("result button clicked successfully");
	let data = {
		"matchID": matchID,
		"player1": player1,
		"p1Score": p1Score,
		"player2": player2,
		"p2Score": p2Score
	}
	fetch('/game/result', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'X-CSRFToken': getCookie('csrftoken'),
		},
		body: JSON.stringify(data)
	})
});
}
