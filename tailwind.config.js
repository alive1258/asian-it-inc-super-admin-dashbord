/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // text color  declaration
      textColor: {
        primary: {
          base: `var(--color-primary-base)`,
          muted: `var(--color-primary-muted)`,
        },
        secondary: {
          base: `var(--color-secondary-base)`,
        },
        info: {
          base: `var(--color-info-base)`,
          muted: `var(--color-info-muted)`,
        },
        warning: {
          base: `var(--color-warning-base)`,
        },
        blue: {
          base: `var(--color-blue-base)`,
        },
        danger: {
          base: `var(--color-danger-base)`,
        },
        success: {
          base: `var(--color-success-base)`,
        },
        neutral: {
          base: `var(--color-neutral-base)`,
          muted: `var(--color-neutral-muted)`,
        },
        black: {
          base: `var(--color-black-base)`,
          solid: `var(--color-black-solid)`,
          muted: `var(--color-black-muted)`,
        },
      },
      // background color  declaration
      backgroundColor: {
        primary: {
          base: `var(--color-primary-base)`,
          muted: `var(--color-primary-muted)`,
        },
        secondary: {
          base: `var(--color-secondary-base)`,
          muted: `var(--color-info-muted)`,
        },
        info: {
          base: `var(--color-info-base)`,
        },
        warning: {
          base: `var(--color-warning-base)`,
        },
        blue: {
          base: `var(--color-blue-base)`,
        },
        danger: {
          base: `var(--color-danger-base)`,
        },
        success: {
          base: `var(--color-success-base)`,
        },
        neutral: {
          base: `var(--color-neutral-base)`,
          muted: `var(--color-neutral-muted)`,
        },
        black: {
          base: `var(--color-black-base)`,
          solid: `var(--color-black-solid)`,
          muted: `var(--color-black-muted)`,
        },
      },
      // border color  declaration
      borderColor: {
        primary: {
          base: `var(--color-primary-base)`,
          muted: `var(--color-primary-muted)`,
        },
        secondary: {
          base: `var(--color-secondary-base)`,
        },
        info: {
          base: `var(--color-info-base)`,
          muted: `var(--color-info-muted)`,
        },
        warning: {
          base: `var(--color-warning-base)`,
        },
        blue: {
          base: `var(--color-blue-base)`,
        },
        danger: {
          base: `var(--color-danger-base)`,
        },
        success: {
          base: `var(--color-success-base)`,
        },
        neutral: {
          base: `var(--color-neutral-base)`,
          muted: `var(--color-neutral-muted)`,
        },
      },
    },
  },
  plugins: [],
};
