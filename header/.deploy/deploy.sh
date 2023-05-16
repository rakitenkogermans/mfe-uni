cd ~/mfe-uni/header
yarn build:prod

rm -rf /var/www/mfe-uni/header/*
mv ~/mfe-uni/header/dist/* /var/www/mfe-uni/header
