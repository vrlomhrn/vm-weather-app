/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        nature: {
          forest: '#2D5016',
          moss: '#68B030',
          sage: '#9CAF88',
          leaf: '#A7C957',
          earth: '#BC6C25',
          bark: '#8B4513',
          sky: '#87CEEB',
          cloud: '#F5F5F5',
          sunset: '#FF7F50'
        }
      },
      backgroundImage: {
        'nature-gradient': 'linear-gradient(135deg, #68B030 0%, #2D5016 100%)',
        'sky-gradient': 'linear-gradient(180deg, #87CEEB 0%, #F5F5F5 100%)'
      },
      fontFamily: {
        'nature': ['Inter', 'system-ui', 'sans-serif']
      }
    },
  },
  plugins: [],
}