/** Tailwind config — màu/font lấy từ src/styles/tokens.css (1 nguồn sự thật).
 *  Sửa giá trị màu ở tokens.css, KHÔNG sửa hex ở đây. */
module.exports = {
  content: ['./src/**/*.{astro,html,js,ts,jsx,tsx,md}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Helvetica', 'Arial', 'sans-serif'],
        display: ['Helvetica', 'Arial', 'sans-serif'],
        logo: ['Arroem', 'Helvetica', 'Arial', 'sans-serif'],
      },
      colors: {
        paper: 'var(--paper)', cream: 'var(--cream)', cream2: 'var(--cream2)',
        ink: 'var(--ink)', ink2: 'var(--ink2)', night: 'var(--night)',
        brown: 'var(--brown)', cocoa: 'var(--cocoa)', cocoa2: 'var(--cocoa2)', bronze: 'var(--bronze)',
        orange: 'var(--orange)', orange2: 'var(--orange2)', orangelt: 'var(--orangelt)', orangedk: 'var(--orangedk)',
        gold: 'var(--gold)', goldlt: 'var(--goldlt)', goldbr: 'var(--goldbr)', golddp: 'var(--golddp)',
        'ft-text': 'var(--ft-text)', 'ft-bright': 'var(--ft-bright)',
        'ft-accent': 'var(--ft-accent)', 'ft-dim': 'var(--ft-dim)',
      },
    },
  },
};
