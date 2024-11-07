const defaultTheme = require("tailwindcss/defaultTheme");
const { rem2px } = require("./util.js");

/** @type {import('tailwindcss').Config['theme']} */
const theme = {
  extend: {
    screens: {
      lg: "1500px",
      md: "1000px",
    },
    colors: {
      primary: "#F6395D",
      background: "#FFFFFF",
      card: "#FDF6E3",
      "text-primary": "#000000",
      "text-secondary": "#FFFFFF",
      "text-light-gray": "#D3D3D3",
      success: "#1BDBA1",
      failure: "#CA235F",
      warning: "#FF9D42",
      rating: "#FFD700",
    },
    borderRadius: rem2px(defaultTheme.borderRadius),
    columns: rem2px(defaultTheme.columns),
    fontSize: {
      ...rem2px(defaultTheme.fontSize),
      xss: "10px",
    },
    lineHeight: rem2px(defaultTheme.lineHeight),
    maxWidth: {
      ...rem2px(defaultTheme.maxWidth),
      "1/2": "50%",
      "3/4": "75%",
    },
    spacing: rem2px(defaultTheme.spacing),
  },
};

module.exports = { theme };
