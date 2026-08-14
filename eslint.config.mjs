import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Vendored Claude skill packages — third-party JS, not project source.
    // Without this, `npm run lint` reports ~480 irrelevant errors and the real
    // ones in src/ are impossible to see.
    ".claude/**",
  ]),
]);

export default eslintConfig;
