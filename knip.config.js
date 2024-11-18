const config = {
  workspaces: {
    ".": {
      entry: "*.{js,ts}",
      project: "*.{js,ts}",
    },
    "workspaces/backend/gql": {
      entry: ["src/index.ts", "src/entities/index.ts", "src/dataSource.ts"],
      project: ["src/**/*.{js,ts}"],
      ignore: ["src/gql-server/*.generated.ts"],
    },
    "workspaces/frontend/web": {
      entry: ["src/index.tsx"],
      project: ["src/**/*.{js,ts,jsx,tsx}"],
      ignore: ["src/gql-client/types/*"],
    },
  },
};

export default config;
