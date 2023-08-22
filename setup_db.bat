@echo off

set sql_slave_user=CREATE USER "mydb_slave_user"@"%" IDENTIFIED BY "mydb_slave_pwd"; GRANT REPLICATION SLAVE ON *.* TO "mydb_slave_user"@"%"; FLUSH PRIVILEGES;

docker exec database_master sh -c "mysql -u root -proot -e '%sql_slave_user%'"

for /f "usebackq tokens=6,7" %%i in (`docker exec database_master sh -c "mysql -u root -proot -e \"SHOW MASTER STATUS\""`) do (
    set CURRENT_LOG=%%i
    set CURRENT_POS=%%j
)

set sql_set_master=CHANGE MASTER TO MASTER_HOST='database_master',MASTER_USER='mydb_slave_user',MASTER_PASSWORD='mydb_slave_pwd',MASTER_LOG_FILE='%CURRENT_LOG%',MASTER_LOG_POS=%CURRENT_POS%; START SLAVE;
set start_slave_cmd=mysql -u root -proot -e "%sql_set_master%"

docker exec database_slave sh -c "%start_slave_cmd%"
docker exec database_slave sh -c "mysql -u root -proot -e 'SHOW SLAVE STATUS \G'"
