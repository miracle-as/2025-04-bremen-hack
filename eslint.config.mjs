import eslint from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import vue from 'eslint-plugin-vue';
import vueParser from 'vue-eslint-parser';

export default [
  {
    ignores: [
      '**/dist/**',
      '**/build/**',
      '**/coverage/**',
      '**/node_modules/**',
      '**/.nuxt/**',
      '**/.output/**',
      '**/.vite/**',
      '**/generated/**',
      '**/*.min.js',
      '**/*.d.ts',
      'dist/**',
      '**/dist',
      '**/dist/*',
      '**/dist/**/*'
    ]
  },
  {
    ...eslint.configs.recommended,
    languageOptions: {
      globals: {
        browser: true,
      },
    },
  },
  {
    files: ['**/*.{js,ts,tsx,vue}'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      'vue': vue,
    },
    rules: {
      // TypeScript specific rules
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': 'error',
      
      // Vue specific rules
      'vue/multi-word-component-names': 'off',
      'vue/no-v-html': 'off',
      'vue/require-default-prop': 'off',
      
      // General rules
      'semi': ['error', 'always'],
      'quotes': ['error', 'single'],
      'indent': ['error', 2],
      'comma-dangle': ['error', 'always-multiline'],
      'no-console': 'warn',
      'no-unused-vars': 'off', // Turned off in favor of @typescript-eslint/no-unused-vars
      'max-len': 'off',
    },
  },
]; 