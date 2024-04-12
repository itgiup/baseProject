sudo systemctl start mongod
sudo service redis-server start
yarn start 


pm2 stop all && pm2 delete all && pm2 start ecosystem.config.js


