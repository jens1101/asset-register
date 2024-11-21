FROM asset-register-base:prod

ARG UPSTREAM_GQL_URL

WORKDIR /app/workspaces/frontend/web/

ENV VITE_UPSTREAM_GQL_URL=${UPSTREAM_GQL_URL}

# A rebuild is required, because any build time env variables for this container
# would not have been applied during the base build.
RUN ["npm", "run", "build"]
CMD ["npm", "run", "start"]
