const { nextui } = require('@nextui-org/react');
const starlightPlugin = require('@astrojs/starlight-tailwind');

const srcDirPath = 'src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    process.env.OB_SITE === 'DOC' ? `./.knosys/sites/default/${srcDirPath}` : `./${srcDirPath}`,
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  darkMode: 'class',
  plugins: [nextui(), starlightPlugin()],
};
