const { NextFederationPlugin } = require("@module-federation/nextjs-mf");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, options) => {
    const { isServer } = options;
    config.plugins.push(
      new NextFederationPlugin({
        name: "home",
        filename: "static/chunks/remoteEntry.js",
        remotes: {
          checkout: `checkout@http://localhost:3001/_next/static/${isServer ? "ssr" : "chunks"}/remoteEntry.js`,
          locations: `locations@http://localhost:3002/_next/static/${isServer ? "ssr" : "chunks"}/remoteEntry.js`
        },
        exposes: {
          "./footer": "./components/Footer.tsx",
          "./nav": "./components/Nav.tsx",
          "./home": "./pages/index.tsx"
        }
      })
    );
    return config;
  }
};

module.exports = nextConfig;
