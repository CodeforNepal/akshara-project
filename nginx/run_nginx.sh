#!/usr/bin/env bash

# exit the script when a command fails
set -o errexit

echo "Starting nginx..."

# hack to use a templatized nginx config (without breaking vars in nginx itself)
# See: https://serverfault.com/questions/577370/how-can-i-use-environment-variables-in-nginx-conf/582794
export DOLLAR='$'
export NGINX_SERVER_NAME=sangraha.org
export NGINX_PORT=80

envsubst < ./akshara.template > /etc/nginx/conf.d/default.conf

nginx -g "daemon off;"
