module.exports = {
  extends: ['airbnb-typescript'],
  parserOptions: {
    project: './tsconfig.json',
  },
  ignorePatterns: [
    ".eslintrc.js",
    "reportWebVitals.ts",
    "config-overrides.js",
    "tailwind.config.js",
  ],
  rules: {
    "react/jsx-props-no-spreading": "off",
    "import/prefer-default-export": "off",
    "linebreak-style": "off",
  }
};