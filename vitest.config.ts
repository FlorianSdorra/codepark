import { defineConfig } from "vitest/config";
// @ts-expect-error: the package's exports field confuses TS
import tsconfigPaths from "vitest-tsconfig-paths";

// the plugin exports a function taking an optional options object and returning
// a Vite Plugin. we duplicate the signature from its d.ts file to get types.
import type { Plugin } from "vite";

interface TsconfigPathsOptions {
  root?: string;
  projects?: string[];
  extensions?: string[];
  loose?: boolean;
}

const tsconfigPathsPlugin = tsconfigPaths as (opts?: TsconfigPathsOptions) => Plugin;

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./vitest.setup.ts",
    include: ["**/*.{test,spec}.{ts,tsx}"],
  },
  plugins: [tsconfigPathsPlugin()],
});
