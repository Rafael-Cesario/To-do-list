/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  test: {
    watch: false,
    environment: 'jsdom',
    reporters: 'verbose',
    globals: true,
  },
});
