cd ~/mfe-uni/host
yarn build:prod

rm -rf /var/www/mfe-uni/host/*
mv ~/mfe-uni/host/dist/* /var/www/mfe-uni/host
