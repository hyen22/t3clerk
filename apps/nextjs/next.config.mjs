// @ts-check
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import("./src/env/server.mjs"));

/** @type {import("next").NextConfig} */
const config = {
  env: {
    DATABASE_URL:"postgresql://t3clerkuser:12345678@20.249.92.154:5432/t3clerk?schema=public",
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: "pk_live_Y2xlcmsucmFrbm8udGsk",
    CLERK_SECRET_KEY: "sk_live_i0pnRjADtk4N2WRmzF5x6JFvbnYjmByXcOEhZtVEIP ",
    CLERK_TRUST_HOST: "true"
  },
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: ["@acme/api", "@acme/db"],
  // We already do linting on GH actions
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default config;
