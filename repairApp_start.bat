@echo off

docker-compose up -d

timeout /t 10

start http://localhost:5173