
// on refresh handle the routing
window.onpopstate = function(event) {
	handleRouting();
};

window.onload = function() {
	handleRouting();
};

function changeURL(path) {
	history.pushState({}, '', path);
}

function loadModule(str) {
	import(str)
		.then((module) => {
			// Use the module
			console.log('Module loaded ' , str);
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
			console.log('Home page');
			showPage('main.html');
			break;
		case '/game':
			loadModule('./game/tmpGame.js');
			showPage(`${page.slice(1)}/${page.slice(1)}.html`);
			break;
		case '/profile':
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
			loadModule('./register.js');
			showPage(`${page.slice(1)}/${page.slice(1)}.html`);
			break;
		case '/login':
			loadModule('./login.js');
			// console.log(`${page.slice(1)} page`);
			showPage(`${page.slice(1)}/${page.slice(1)}.html`);
			break;
		default:
			console.log('Page not found');
			console.log(window.location.pathname);
		break;
	}
}

function showPage(path) {
	fetch(path)
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