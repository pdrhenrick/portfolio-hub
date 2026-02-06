/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#ef4444", // Vermelho Vibrante (Estilo Red Hat / Oracle)
        primaryDark: "#b91c1c", // Vermelho mais escuro para efeitos
        secondary: "#9ca3af", // Cinza metálico
        dark: "#09090b", // Preto quase absoluto (fundo principal)
        darker: "#000000", // Preto absoluto (fundo secundário)
      },
      backgroundImage: {
        'grid-pattern': "linear-gradient(to right, #202020 1px, transparent 1px), linear-gradient(to bottom, #202020 1px, transparent 1px)",
      }
    },
  },
  plugins: [],
}