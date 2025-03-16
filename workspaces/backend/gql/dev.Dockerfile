FROM asset-register-base:dev
WORKDIR /app/workspaces/backend/gql
EXPOSE 9229
CMD (cd /app; npm i); npm run start:dev
