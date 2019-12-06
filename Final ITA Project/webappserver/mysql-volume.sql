DROP DATABASE IF EXISTS db;
CREATE DATABASE db;
USE db; 

CREATE TABLE user (
    id INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL DEFAULT '',
    last_name VARCHAR(30) NOT NULL DEFAULT '',
    email VARCHAR(30) NOT NULL DEFAULT '',
    phone INT(10) NOT NULL DEFAULT '0',
    password VARCHAR(30) NOT NULL DEFAULT '',
    contact_method VARCHAR(30) NOT NULL DEFAULT '',
    heard_from VARCHAR(30) NOT NULL DEFAULT '',
    comments VARCHAR(30) NOT NULL DEFAULT '',
    sub_to_news VARCHAR(1) NOT NULL DEFAULT '',
    PRIMARY KEY (id)
)  ENGINE=INNODB DEFAULT CHARSET=LATIN1;
CREATE TABLE product (
    id INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    prod_name VARCHAR(30) NOT NULL DEFAULT '',
    price INT(11) NOT NULL DEFAULT '0',
    description VARCHAR(300) NOT NULL DEFAULT '',
    category VARCHAR(30) NOT NULL DEFAULT '',
    prod_number INT(5) NOT NULL DEFAULT '0',
    image VARCHAR(50) NOT NULL DEFAULT 'image is missing',
    PRIMARY KEY (id)
)  ENGINE=INNODB DEFAULT CHARSET=LATIN1;
CREATE TABLE orders (
    id INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL DEFAULT '',
    last_name VARCHAR(30) NOT NULL DEFAULT '',
    prod_number INT(5) NOT NULL DEFAULT '0',
    email VARCHAR(30) NOT NULL DEFAULT '',
    PRIMARY KEY (id)
)  ENGINE=INNODB DEFAULT CHARSET=LATIN1;

INSERT INTO user (first_name,last_name,email)
VALUES
	('Peter','Davenport','pdavenport@redventures.com'),
    ('Fernando','Sepulveda','fs@rv.com'),
    ('samplefirst','samplelast','sample@samplemail.com');
INSERT INTO product (prod_name,price,description,category,prod_number,image)
VALUES
	('Zoom',1,'Zoom is enterprise video conferencing with real-time messaging and content sharing','Communication',1,'assets/zoom.png'),
    ('Last Pass',2,"LastPass remembers all your passwords, so you don't have to!",'Productivity',2,'assets/lastpass.png'),
    ('Atom',3,'Atom makes collaborating on code just as easy as it is to code alone, right from your editor.','Development',3,'assets/atom.png'),
    ('Slack',4,"Slack brings all your communication together in one place. It's real-time messaging, archiving and search for modern teams.",'Communication',4,'assets/slack.png'),
    ('Amazon Web Services',5,'Amazon Web Services is a subsidiary of Amazon that provides on-demand cloud computing platforms to individuals, companies and governments, on a metered pay-as-you-go basis.','Hosting',5,'assets/aws.png'),
    ('GitHub',6,'GitHub is a company that provides hosting for software development version control using Git.','Development',6,'assets/github.png'),
    ('Docker',7,'Docker is a full development platform for creating containerized apps.','Hosting',7,'assets/docker.png');