window.onpopstate = function(event) {
	handleRouting();
};

window.onload = function() {
	handleRouting();
};

function changeURL(path) {
	history.pushState({}, '', path);
}

function handleRouting() {
	switch (window.location.pathname) {
		case '/':
			console.log('Home page');
			break;
		case '/game':
			console.log('Game page');
			showGame();
			break;
		case '/profile':
			console.log('Profile page');
			showProfile();
			break;
		case '/history':
			console.log('History page');
			showHistory();
			break;
		case '/about':
			console.log('About page');
			showAboutUs();
			break;
		case '/settings':
			console.log('Settings page');
			showSettings();
			break;
		default:
			console.log('Page not found');
			console.log(window.location.pathname);
			break;
			// ShowNotFound();
	}
}


let background = ["none", "/static/images/background.jpg"];
let i = 0;

function changeBg() {
	i = (i + 1) % background.length; 
	if (background[i] === "none") {
	document.body.style.backgroundImage = background[i];
	} else {
	document.body.style.backgroundImage = `url(${background[i]})`;
	}
	console.log(document.body.style.backgroundImage);
}

function showGame() {
		fetch('game/game.html')
			.then(response => response.text())
			.then(data => {
				document.getElementById('content').innerHTML = data;
			})
			.catch(error => console.log(error));
	}

	function showProfile() {
		fetch('profile/profile.html')
			.then(response => response.text())
			.then(data => {
				document.getElementById('content').innerHTML = data;
			})
			.catch(error => console.log(error));
	}

	function showHistory() {
		fetch('history/history.html')
			.then(response => response.text())
			.then(data => {
				document.getElementById('content').innerHTML = data;
			})
			.catch(error => console.log(error));
	}

	function ShowNotFound() {
		fetch('404.html')
			.then(response => response.text())
			.then(data => {
				document.getElementById('content').innerHTML = data;
			})
			.catch(error => console.log(error));
	}

	function showAboutUs() {
		fetch('about/about.html')
			.then(response => response.text())
			.then(data => {
				document.getElementById('content').innerHTML = data;
			})
			.catch(error => console.log(error));
	}

	
	function showSettings() {
		fetch('settings/settings.html')
			.then(response => response.text())
			.then(data => {
				document.getElementById('content').innerHTML = data;
			})
			.catch(error => console.log(error));
	}

	function changeURL(path, title, stateObject) {
		history.pushState(stateObject, title, path);
		handleRouting();
	}