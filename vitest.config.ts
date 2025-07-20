import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';
import { svelteTesting } from '@testing-library/svelte/vite';
import path from 'path';

export default defineConfig({
  plugins: [sveltekit(), svelteTesting()],
  test: {
    globals: true,
    projects: [
      {
        extends: true,
        test: {
          name: 'unit',
          include: ['src/**/*.{test,spec}.{js,ts}'],
          exclude: ['src/**/*.integration.test.{js,ts}'],
          environment: 'jsdom',
          setupFiles: ['./src/tests/setup.ts'],
        },
      },
      {
        extends: true,
        test: {
          name: 'integration',
          include: ['src/**/*.integration.test.{js,ts}'],
          environment: 'node',
          setupFiles: ['./src/tests/setup.integration.ts'],
          pool: 'forks',
          testTimeout: 10000,
        },
      },
    ],
  },
  resolve: {
    alias: {
      $lib: path.resolve('./src/lib'),
      '$app/environment': path.resolve('./src/app.ts'),
    },
  },
});