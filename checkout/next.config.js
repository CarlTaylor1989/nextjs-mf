const { NextFederationPlugin } = require("@module-federation/nextjs-mf");
/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  webpack: (config, options) => {
    const { isServer } = options;
    config.optimization.runtimeChunk = "single";
    config.plugins.push(
      new NextFederationPlugin({
        name: "checkout",
        remotes: {
          home: `home@http://localhost:3000/_next/static/${isServer ? "ssr" : "chunks"}/remoteEntry.js`,
          locations: `locations@http://localhost:3002/_next/static/${isServer ? "ssr" : "chunks"}/remoteEntry.js`
        },
        filename: "static/chunks/remoteEntry.js",
        exposes: {
          "./basket": "./components/Basket.tsx",
          "./checkout": "./pages/checkout.tsx"
        },
        extraOptions: {
          exposePages: true
        }
      })
    );
    return config;
  }
};

module.exports = nextConfig;
