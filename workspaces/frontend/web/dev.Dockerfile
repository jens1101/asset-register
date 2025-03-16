FROM asset-register-base:dev
WORKDIR /app/workspaces/frontend/web/
CMD (cd /app; npm i); npm run start:dev
