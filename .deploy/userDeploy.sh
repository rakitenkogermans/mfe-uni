cd ~/mfe-uni/user
yarn build:prod

rm -rf /var/www/mfe-uni/user/*
mv ~/mfe-uni/user/dist/* /var/www/mfe-uni/user
