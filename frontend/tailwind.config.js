/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Asegúrate de que esta línea incluya tus archivos
  ],
  theme: {
    extend: { colors: {
      morado: '#6a0dad', // Define el color morado
      blanco: '#ffffff', // Define el color blanco
    },
  },
  },
  plugins: [],
};

