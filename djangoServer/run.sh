#!/bin/bash

touch /var/lib/mysql/mysql.sock
chmod 0666 /var/lib/mysql/mysql.sock
usermod -d /var/lib/mysql/ mysql
chown -R mysql:mysql /var/lib/mysql/

service mysql stop
service mysql start

# restart nginx service
/etc/init.d/nginx start
nginx -s reload

# restart nginx uwsgi service
killall -9 uwsgi
uwsgi --ini uwsgi/uwsgi.ini

# restart django server
# ps -ef | grep "8000" | head -n 2 | awk '{print $2}' | xargs kill -9

nohup python manage.py runserver 0.0.0.0:8000 &
#python manage.py runserver 0.0.0.0:8000



