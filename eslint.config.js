import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

export default [
  js.configs.recommended,
  ...compat.extends('next/core-web-vitals'),
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    rules: {
      // Turn off common issues that might be too strict
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      'react-hooks/exhaustive-deps': 'warn',
      'prefer-const': 'warn',
      'no-console': 'warn',
      // Allow unused variables that start with underscore
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'dist/**',
      'build/**',
    ],
  },
];
