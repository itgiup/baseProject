export Appname=hottrendfashion
export Domain=$Appname.com


# https://github.com/cli/cli/blob/trunk/docs/install_linux.md



# install nodejs
sudo apt update
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
source ~/.bashrc
nvm list-remote
nvm install lts/hydrogen

npm install --global yarn

npm i pm2 -g
npm i serve -g 
npm i nodemon -g
node -v 


# https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/
# https://www.fosstechnix.com/how-to-install-mongodb-on-ubuntu-22-04-lts/

# https://www.digitalocean.com/community/tutorials/how-to-install-and-secure-redis-on-ubuntu-20-04
sudo systemctl enable redis-server


# https://www.digitalocean.com/community/tutorials/how-to-configure-nginx-as-a-reverse-proxy-on-ubuntu-22-04

sudo ufw allow www
sudo ufw allow https
sudo ufw status

sudo systemctl restart nginx
sudo systemctl status nginx

chmod u+x ./push.sh

pm2 stop   && yarn build && pm2 start   
