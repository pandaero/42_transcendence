CREATE DATABASE transcendence_db;

--change pw to env
CREATE USER admin_user WITH PASSWORD 'docker';

GRANT ALL PRIVILEGES ON DATABASE transcendence TO admin_user;

CREATE TABLE users(
	userKeyId INT PRIMARY KEY,
	email varchar(30),
	pwd varchar(30),
	userName varchar(30),
	firstName varchar(30),
	lastName varchar(30),
	avatar varchar(255),
	games int,
	wins int,
	losses int,
	friends int,
);

CREATE TABLE history(
	gameID	INT PRIMARY KEY,
	playerOne	varchar(30),
	playerTwo	varchar(30),
	enemyScore	int,
	ownScore	int,
)
