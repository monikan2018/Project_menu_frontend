#!/bin/bash

curl "http://localhost:8000/mangos/${ID}" \
  --include \
  --request GET \
  --header "Authorization: Token ${TOKEN}"
echo
