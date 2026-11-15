import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  // Assets are pre-optimized with responsive variants; static hosting has no image API.
  { rules: { '@next/next/no-img-element': 'off' } },
  globalIgnores(['.next/**', 'out/**', 'assets/**', 'next-env.d.ts']),
]);
