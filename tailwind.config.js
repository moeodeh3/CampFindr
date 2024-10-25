// @ts-nocheck
const { theme } = require('./tailwind/theme.js');

module.exports = {
  content: [
    './src/components/**/*.{ts,tsx,js,jsx}', 
    './src/pages/**/*.{ts,tsx,js,jsx}'
  ],
  theme: {
    ...theme,
  },
  variants: {},
  plugins: [],
}
