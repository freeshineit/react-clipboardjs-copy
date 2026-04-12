export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "header-max-length": [1, "always", 100],
    "type-enum": [2, "always", ["feat", "fix", "enhance", "chore", "test", "docs", "refactor", "style", "revert", "perf", "ci", "build", "release", "version"]],
    "scope-case": [2, "always", "lower-case"],
    "subject-case": [0],
  },
};
