/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "primary":"#951366",
        "hover":'#c64798'
      },
      gridTemplateColumns:{
        'auto':'repeat(auto-fill, minmax(200px,1fr))'
      },
      backgroundImage: {
        'pattern': "url('/back.jpg')",
        
      }
      
    },
  },
  plugins: [],
}