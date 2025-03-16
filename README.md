# Asset Register

## Running the Project

### Development Containers

The project is setup to work with [dev containers](https://containers.dev/).
This is the recommended way of developing the app.

When opening the project in a dev container it is recommended to run `npm i`
manually. This is to ensure that ownership of the `node_modules` folder is set
and that all post install scripts run correctly.

### Docker Compose

Production:

```sh
docker compose up
```

Development:

```sh
docker compose -f docker-compose.yml -f dev.docker-compose.yml up
```

## Workspaces

[Workspaces](https://docs.npmjs.com/cli/v10/using-npm/workspaces) are a way of
managing multiple packages in one repo.

In this repo workspaces are found in the "workspaces" folder and are also
grouped in sub-directories. This means that you _cannot_ add a package directory
directly to the "workspaces" directory. You need to place it in another
direcotry. This approach aids organisation. Example layout:

```
workspaces/
  frontend/
    web-app/
      package.json
    marketing-site/
      package.json
  backend/
    graphql-service/
      package.json
    file-service/
      package.json
  shared/
    common/
      package.json
```

## Removing `node_modules`

```sh
sudo rm -rf node_modules **/node_modules
```
