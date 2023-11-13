CREATE USER admin_user WITH PASSWORD 'docker';

CREATE DATABASE transcendence_db WITH OWNER admin_user;

CREATE TABLE users(
	userKeyId SERIAL PRIMARY KEY,
	email VARCHAR(30),
	pwd VARCHAR(30),
	userName VARCHAR(30),
	firstName VARCHAR(30),
	lastName VARCHAR(30),
	avatar VARCHAR(255),
	games INT,
	wins INT,
	losses INT,
	friends INT
);

CREATE TABLE history(
	gameID	SERIAL PRIMARY KEY,
	playerOne	VARCHAR(30),
	playerTwo	VARCHAR(30),
	enemyScore	INT,
	ownScore	INT
);

GRANT ALL PRIVILEGES ON DATABASE transcendence_db TO admin_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO admin_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO admin_user;
GRANT CREATE ON SCHEMA public TO admin_user;