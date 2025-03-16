FROM asset-register-base:prod

ARG UPSTREAM_GQL_URL

WORKDIR /app/workspaces/frontend/web/

ENV VITE_UPSTREAM_GQL_URL=${UPSTREAM_GQL_URL}

RUN ["npm", "run", "build"]
CMD ["npm", "run", "start"]
