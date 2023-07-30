/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'sm':'0px',   
        'md':'480px', 
        'lg': '770px',    
        'xl': '990px',    
      }
    },
  },
  plugins: [],
}

