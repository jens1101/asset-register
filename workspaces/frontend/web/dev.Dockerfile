FROM asset-register-base:dev
WORKDIR /app/workspaces/frontend/web/
CMD npm install; npm run start:dev;
