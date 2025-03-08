import { defineConfig } from 'vite';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  root: resolve(__dirname),
  base: '/mywebsite/',
  build: {
    // Add this build configuration
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        desktop: resolve(__dirname, 'desktop.html'),
        diary: resolve(__dirname, 'diary.html'),
        fuckMe: resolve(__dirname, 'fuck-me.html'),
        halloAsli: resolve(__dirname, 'hallo-asli.html'),
        howToLeaveTown1: resolve(__dirname, 'how-to-leave-town-p1.html'),
        howToLeaveTown2: resolve(__dirname, 'how-to-leave-town-p2.html'),
        howToLeaveTown3: resolve(__dirname, 'how-to-leave-town-p3.html'),
        howToLeaveTown5: resolve(__dirname, 'how-to-leave-town-p5.html'),
        howToLeaveTown6: resolve(__dirname, 'how-to-leave-town-p6.html'),
        howToLeaveTown4: resolve(__dirname, 'how-to-leave-town-p4.html'),
        howToLeaveTown7: resolve(__dirname, 'how-to-leave-town-p7.html'),
        howToLeaveTown8: resolve(__dirname, 'how-to-leave-town-p8.html'),
        howToLeaveTown9: resolve(__dirname, 'how-to-leave-town-p9.html'),
        howToLeaveTown: resolve(__dirname, 'how-to-leave-town.html'),
        loveMe: resolve(__dirname, 'love-me.html'),
        njePanimaju: resolve(__dirname, 'nje-panimaju.html'),
        rauber: resolve(__dirname, 'rauber.html'),
      },
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'src/js/htlt-fuck.js') {
            return 'src/js/htlt-fuck.js'; // Keep the original name
          }
          return 'assets/[name]-[hash][extname]'; // Default asset naming
        },
      },
    },
  },
  server: {
    // Optional, but helpful during development
    open: 'index.html', // Opens index.html by default during dev
  },
});
