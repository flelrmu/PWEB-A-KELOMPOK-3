/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['views/*/.{html,js,hbs}',
  'node_modules/preline/dist/*.js'
],
  theme: {
    extend: {},
  },
  plugins: [
    require('preline/plugin'),
    require('daisyui')
  ],
}
