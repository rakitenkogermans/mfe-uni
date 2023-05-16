cd ~/mfe-uni/cart
yarn build:prod

rm -rf /var/www/mfe-uni/cart/*
mv ~/mfe-uni/cart/dist/* /var/www/mfe-uni/cart
