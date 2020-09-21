#!/bin/bash

curl "http://localhost:8000/menus/${ID}" \
  --include \
  --request GET \
  --header "Authorization: Token ${TOKEN}"

echo
