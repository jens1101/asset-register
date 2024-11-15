export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "subject-case": [2, "always", ["sentence-case"]],
    "body-max-line-length": [0, "always", Infinity],
  },
};
