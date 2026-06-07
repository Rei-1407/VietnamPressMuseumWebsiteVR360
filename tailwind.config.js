/** Tailwind config — build CSS tĩnh thay cho CDN runtime.
 *  Build lại bằng:  scripts\build-css.ps1   (khi đổi class trong HTML/JS) */
module.exports = {
  content: ['./index.html', './admin/index.html', './js/*.js'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Helvetica', 'Arial', 'sans-serif'],
        serif: ['Helvetica', 'Arial', 'sans-serif'],
        sans: ['Helvetica', 'Arial', 'sans-serif'],
        logo: ['Arroem', 'Helvetica', 'Arial', 'sans-serif'],
      },
      colors: {
        cream: '#FCFAF4', cream2: '#F6EFE1', ink: '#2C2113', ink2: '#5A4A30',
        gold: '#C99A3F', goldlt: '#E6C277', goldbr: '#EBCB82', golddp: '#A9731F',
        bronze: '#8A5A1C', night: '#1A140B',
        // ----- New Design (Figma) accents -----
        orange: '#E6952E', orange2: '#D07E1C', orangelt: '#F2B45E', orangedk: '#B96E14',
        cocoa: '#3A2408', cocoa2: '#52340C', paper: '#FEFCF0',
      },
    },
  },
};
