module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'max-len': 'off', // Kind of useless, for code style
    'radix': 'off', // Useless, we wont be dealing with hex values
    'global-require': 'off', // this one is fine because were only requiring image filepaths,  
    'react/forbid-prop-types': 'off', // this ideally would be fixed, but were in too deep 
    'react/prop-types': 'off' // this ideally would be fixed, but were in too deep 
  },
};
