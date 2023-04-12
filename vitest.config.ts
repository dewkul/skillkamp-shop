import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    setupFiles: ['./__tests__/test-setup.ts'],
    environment: 'happy-dom',
    includeSource: ['src/**/*.{ts.tsx}'],
    coverage: {
      provider: 'c8',
      reporter: ['text', 'text-summary'],
    },
  },
})
