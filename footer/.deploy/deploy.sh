cd ~/mfe-uni/footer
yarn build:prod

rm -rf /var/www/mfe-uni/footer/*
mv ~/mfe-uni/footer/dist/* /var/www/mfe-uni/footer
