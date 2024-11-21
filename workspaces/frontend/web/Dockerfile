FROM asset-register-base:prod

ARG GQL_SERVER_HOST
ARG GQL_SERVER_PORT

WORKDIR /app/workspaces/frontend/web/

ENV VITE_GQL_SERVER_HOST=${GQL_SERVER_HOST}
ENV VITE_GQL_SERVER_PORT=${GQL_SERVER_PORT}

# A rebuild is required, because any build time env variables for this container
# would not have been applied during the base build.
RUN ["npm", "run", "build"]
CMD ["npm", "run", "start"]
