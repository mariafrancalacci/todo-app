import vue2 from '@vitejs/plugin-vue2';
import { defineConfig } from 'vitest/config'

export default defineConfig({
    plugins: [vue2()],
    test: {
        include: ['**/*.test.ts'],
        globals: true
    },
})