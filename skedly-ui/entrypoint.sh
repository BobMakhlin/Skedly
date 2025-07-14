#!/bin/sh

envsubst < /usr/share/nginx/html/env.prod.js > /usr/share/nginx/html/env.js

exec nginx -g "daemon off;"
