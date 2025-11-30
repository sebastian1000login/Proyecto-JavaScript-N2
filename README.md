## Mysql:

create user 'dbaccess'@localhost identified by 'password';

grant all privileges on *.* to 'dbaccess'@localhost identified by 'password';

flush privileges;

create database dbalmacen;

use dbalmacen;

create table producto(codpro int auto_increment primary key, despro varchar(30), precio decimal(6,1), stock int);

## Inside server:

npx nodemon index.js

## Inside proyectocrud:

npm start
