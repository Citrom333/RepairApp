#!/bin/bash

docker-compose up -d

sleep 10

google-chrome http://localhost:5173 &

