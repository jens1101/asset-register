FROM asset-register-base:dev
WORKDIR /app/workspaces/backend/gql
EXPOSE 9229
CMD npm install; \
  npm run build; \
  setsid npm run build:watch & \
  npm run start:dev
