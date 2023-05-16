cd ~/mfe-uni/product
yarn build:prod

rm -rf /var/www/mfe-uni/product/*
mv ~/mfe-uni/product/dist/* /var/www/mfe-uni/product
