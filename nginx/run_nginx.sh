#!/usr/bin/env bash

# exit the script when a command fails
set -o errexit

echo "Starting nginx..."

# hack to use a templatized nginx config (without breaking vars in nginx itself)
# See: https://serverfault.com/questions/577370/how-can-i-use-environment-variables-in-nginx-conf/582794
export DOLLAR='$'

envsubst < /etc/nginx/conf.d/akshara.template > /etc/nginx/conf.d/default.conf

nginx -g "daemon off;"
