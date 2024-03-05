let content = document.getElementById('content');
let matrix = document.createElement('canvas');
content.appendChild(matrix);
let header = document.getElementById('header-bar');
// let information = document.createElement('div');
// information.id = 'information';
// information.textContent = 'hello world';

console.log(header.offsetHeight);

// document.body.appendChild(information);

matrix.id = 'matrix';
matrix.width = window.innerWidth - 10;
matrix.height = window.innerHeight - header.offsetHeight;

let fontSize = window.innerWidth * 0.05;


window.addEventListener('resize', function() {
	matrix.width = window.innerWidth;
	matrix.height = window.innerHeight - header.offsetHeight;
	fontSize = window.innerWidth * 0.05;
	ctx.font = fontSize + 'px arial';
	ctx.fillStyle = '#FF0000';
});

let ctx = matrix.getContext('2d');


let welcome = ['Bienvenue', 'Willkommen', 'Chào mừng', 'Witaj', 'Добро пожаловать', 'Welcome', '환영합니다', '欢迎', 'Vítejte', 'Laipni lūdzam', 'Benvenuto', 'Bienvenido', 'Bem-vindo', 'Velkommen', 'Tervetuloa', 'Καλώς ήρθες', 'Hoş geldiniz', 'ยินดีต้อนรับ', 'Selamat datang', 'ようこそ', 'Välkommen'];

ctx.font = fontSize + 'px arial';
ctx.fillStyle = '#FFFFFF';

let drop = {
    x: Math.random() * matrix.width,
    y: Math.random() * matrix.height,
    text: welcome[Math.floor(Math.random() * welcome.length)]
};

function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.fillRect(0, 0, matrix.width, matrix.height);

    ctx.fillStyle = '#FFFFFF';
    ctx.fillText(drop.text, drop.x, drop.y * (fontSize));
}

function moveDrop() {
    drop.y++;
    if(drop.y * (fontSize + 10) > matrix.height) {
        drop.y = 0;
        drop.x = matrix.width / 2 - drop.text.length * (fontSize + 10) / 2;
        drop.text = welcome[Math.floor(Math.random() * welcome.length)];
    }
}

draw();
setInterval(moveDrop, 100);
setInterval(draw,50);