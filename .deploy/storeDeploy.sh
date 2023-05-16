cd ~/mfe-uni/store
yarn build:prod apiUrl="https://api.mfe-uni.germans.dev"

rm -rf /var/www/mfe-uni/store/*
mv ~/mfe-uni/store/dist/* /var/www/mfe-uni/store
