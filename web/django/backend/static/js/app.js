



// on refresh handle the routing
window.onpopstate = function(event) {
	handleRouting();
};

window.onload = function() {
	handleRouting();
};

function changeURL(path, title, stateObject) {
	currentJS();
	history.pushState(stateObject, title, path);
	handleRouting();
}	

function unloadEvents(str) {
	str
	import(str)
		.then((module) => {
			if (module.unload)
				module.unload().then(() => {
					console.log("Unloading successful");
				}).catch((error) => {
					console.error("Unloading failed:", error);
				});
		})
		.catch((err) => {
			// Handle the error
			console.error('Failed to unload module', err);
		});
}


function loadModule(str) {
	import(str)
		.then((module) => {
			if (module.init){
				module.init().then(() => {
					console.log("Initialization successful");
				}).catch((error) => {
					console.log("Initialization failed:", error)
				});
			}
		})
		.catch((err) => {
			// Handle the error
			console.error('Failed to load module', err);
		});
}
// changing the path and content
function handleRouting() {
	let page = window.location.pathname;
	switch (page) {
		case '/':
			showPage('main.html');
			break;
		case '/game':
			showPage(`${page.slice(1)}/${page.slice(1)}.html`);
			loadModule('./game/tmpGame.js');
			break;
		case '/profile':
			console.log("profile page");
			showPage(`${page.slice(1)}/${page.slice(1)}.html`);
			break;
		case '/history':
			showPage(`${page.slice(1)}/${page.slice(1)}.html`);
			break;
		case '/about':
			showPage(`${page.slice(1)}/${page.slice(1)}.html`);
			break;
		case '/settings':
			showPage(`${page.slice(1)}/${page.slice(1)}.html`);
			break;
		case '/register':
			showPage(`${page.slice(1)}/${page.slice(1)}.html`);
			loadModule('./register.js');
			break;
		case '/login':
			// console.log(`${page.slice(1)} page`);
			showPage(`${page.slice(1)}/${page.slice(1)}.html`);
			console.log('login page');
			loadModule('./login.js');
			break;
		default:
			console.log('Page not found');
			console.log(window.location.pathname);
		break;
	}
}

function currentJS() {
	let page = window.location.pathname;

	switch (page) {
		case '/':
			showPage('main.html');
			break;
		case '/game':
			return('./game/tmpGame.js');
			break;
		case '/profile':
			break;
		case '/history':
			break;
		case '/about':
			break;
		case '/settings':
			break;
		case '/register':
			unloadEvents('./register.js');
			break;
		case '/login':
			unloadEvents('./login.js');
			break;
		default:
			break;
	}
}


function showPage(path) {
	return fetch(path)
		.then(response => response.text())
		.then(data => {
			document.getElementById('content').innerHTML = data;
		})
		.catch(error => console.log(error));
}

		

	// part for background change in settings
	let background = ["none", "/static/images/background.jpg", "/static/images/black.jpg" ];
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


	// document.getElementById('gameButton').addEventListener('click', function() {
	// 	addStylesheet('styles/game.css');
	// });