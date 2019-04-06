#!/bin/bash
killall -9 uwsgi
nginx -s reload
uwsgi --ini uwsgi/uwsgi.ini
./manage.py runserver 0.0.0.0:8000
