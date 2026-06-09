// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// Site tĩnh — deploy GitHub Pages với tên miền riêng (CNAME trong public/).
export default defineConfig({
  site: 'https://baotangsobaochivietnam.com',
  output: 'static',
  // Tự quản base styles trong src/styles (tokens + global) — không để Tailwind chèn preflight qua integration
  integrations: [tailwind({ applyBaseStyles: false })],
  server: { port: 4321 },
});
