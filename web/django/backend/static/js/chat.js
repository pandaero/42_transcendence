let chatWindow;
let fontSize;
let chatText;
export function init() {
	return new Promise((resolve, reject) => {
		chatWindow = document.getElementById('chat-window');
		if (chatWindow) {
			console.log("chat window found");
			window.addEventListener('resize', drawText);
			drawText();
			resolve();
		} else {
			// Reject the promise if the chat window is not found
			console.log("chat window not found");
			// reject(new Error("Chat window not found"));
		}
	});
}

export function unload() {
	return new Promise((resolve, reject) => {
		if (chatWindow) {
			window.removeEventListener('resize', drawText);
			fontSize = null;
			chatText = null;
			chatText = null;

			chatWindow = null;
			console.log("login button unloaded");
			// Resolve the promise if everything is successful
			resolve();
		} else {
			// Reject the promise if the login button is not found
			reject(new Error("Login button not found"));
		}
		loginBtn = null;
	});
}

function drawText(){
	fontSize = window.innerWidth / 50;
	chatText = chatWindow.getContext("2d");
	console.log(fontSize);
	chatText.clearRect(0, 0, chatWindow.width, chatWindow.height);
	chatText.font = fontSize + "px Arial";
	chatText.fillsStyle = "black";
	chatText.fillText("Hello World", (chatWindow.width/4), (chatWindow.height/2));
}