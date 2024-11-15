FROM dpage/pgadmin4:latest

ARG DATABASE_HOST
ARG DATABASE_PORT
ARG DATABASE_NAME
ARG DATABASE_USER

USER root

RUN cat <<JSON > /pgadmin4/servers.json
{
  "Servers": {
    "1": {
      "Name": "Asset register",
      "Group": "Servers",
      "Host": "${DATABASE_HOST}",
      "Port": ${DATABASE_PORT},
      "MaintenanceDB": "${DATABASE_NAME}",
      "Username": "${DATABASE_USER}",
      "SSLMode": "prefer"
    }
  }
}
JSON
