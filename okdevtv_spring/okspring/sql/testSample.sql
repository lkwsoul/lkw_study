create database javaTest;

GRANT ALL PRIVILEGES ON *.* TO javauser@localhost
   IDENTIFIED BY 'lkwsoul' WITH GRANT OPTION;
   
use mysql;

update user set password=password('test') where user='lkwsoul';

use javaTest;

create table testdata (
       id int not null auto_increment primary key,
       foo varchar(25),
       bar int);
       
insert into testdata values(null, 'hello', 12345);