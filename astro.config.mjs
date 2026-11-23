// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';
import keystatic from '@keystatic/astro';

// https://astro.build/config
export default defineConfig({
  site: 'https://solarfire.com.co',
  vite: {
    plugins: [tailwindcss()],
    // El panel importa react-dom/client (CommonJS); hay que pre-empaquetarlo en dev.
    optimizeDeps: {
      include: ['react', 'react/jsx-runtime', 'react-dom', 'react-dom/client']
    }
  },

  // React solo lo usa el panel de administración (/keystatic).
  // La landing sigue siendo 100 % estática; el adapter de Vercel sirve el panel.
  integrations: [react(), keystatic()],
  adapter: vercel()
});
