#!/bin/sh

cat <<EOF > /usr/share/nginx/html/assets/config.json
{
  "apiUrl": "${API_URL}",
  "environment": "${ENVIRONMENT}"
}
EOF
