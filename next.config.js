const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
  PHASE_PRODUCTION_SERVER,
} = require("next/constants");

/** @type {import('next').NextConfig} */
// const nextConfig = {}

// module.exports = nextConfig

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      experimental: {
        serverActions: true,
      },
      reactStrictMode: true,
      images: {
        domains: [
          "platform-lookaside.fbsbx.com",
          "avatars.githubusercontent.com",
          "lh3.googleusercontent.com"
        ],
      },
      env: {
        GATEWAY_BASE_URL: process.env.GATEWAY_BASE_URL,
        STORE_BASE_URL: process.env.STORE_BASE_URL,
        NEXTAUTH_URL: "http://localhost:3000",
        NEXTAUTH_SECRET: "yfWh9S6TeX",
        GOOGLE_CLIENT_ID:
          "111284700249-rsk6ps62ndp0ql5koi6rkoijpf14d5kk.apps.googleusercontent.com",
        GOOGLE_CLIENT_SECRET: "NLgyP0_59rhyAzIb2Gi4Zl_x",
        FACEBOOK_CLIENT_ID: "258923086737400",
        FACEBOOK_CLIENT_SECRET: "e44ac9d31a537fad7ffe5dfdbb4714f7",
        GITHUB_CLIENT_ID: "bdb79fd2920340b79690",
        GITHUB_CLIENT_SECRET: "130f2c3e0d39bc4f920834d82a63a52d2ab90f6f",
        RAWG_KEY: "e3ddb64290a34ab6a15790221abfef97",
        DATABASE_URL: "postgresql://postgres:postgres@postgres:5432/gamemarket?schema=public"
      },
    };
  }

  // production
  return {
    experimental: {
      serverActions: true,
    },
    reactStrictMode: true,
    images: {
      domains: [
        "platform-lookaside.fbsbx.com",
        "avatars.githubusercontent.com",
        "lh3.googleusercontent.com"
      ],
    },
    env: {
      GATEWAY_BASE_URL: "http://gateway:3000",
      STORE_BASE_URL: process.env.STORE_BASE_URL,
      NEXTAUTH_URL: "http://localhost:3000",
      NEXTAUTH_SECRET: "yfWh9S6TeX",
      GOOGLE_CLIENT_ID:
        "111284700249-rsk6ps62ndp0ql5koi6rkoijpf14d5kk.apps.googleusercontent.com",
      GOOGLE_CLIENT_SECRET: "NLgyP0_59rhyAzIb2Gi4Zl_x",
      FACEBOOK_CLIENT_ID: "258923086737400",
      FACEBOOK_CLIENT_SECRET: "e44ac9d31a537fad7ffe5dfdbb4714f7",
      GITHUB_CLIENT_ID: "bdb79fd2920340b79690",
      GITHUB_CLIENT_SECRET: "130f2c3e0d39bc4f920834d82a63a52d2ab90f6f",
      RAWG_KEY: "e3ddb64290a34ab6a15790221abfef97",
      DATABASE_URL: "postgresql://postgres:postgres@postgres:5432/gamemarket?schema=public"
    },
  };
};
