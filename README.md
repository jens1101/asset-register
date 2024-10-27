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
