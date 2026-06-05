/** Tailwind config — build CSS tĩnh thay cho CDN runtime.
 *  Build lại bằng:  scripts\build-css.ps1   (khi đổi class trong HTML/JS) */
module.exports = {
  content: ['./index.html', './admin/index.html', './js/*.js'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', '"EB Garamond"', 'Georgia', 'serif'],
        serif: ['"EB Garamond"', 'Georgia', 'serif'],
        sans: ['"Be Vietnam Pro"', 'system-ui', 'sans-serif'],
      },
      colors: {
        cream: '#FCFAF4', cream2: '#F6EFE1', ink: '#2C2113', ink2: '#5A4A30',
        gold: '#C99A3F', goldlt: '#E6C277', goldbr: '#EBCB82', golddp: '#A9731F',
        bronze: '#8A5A1C', night: '#1A140B',
      },
    },
  },
};
