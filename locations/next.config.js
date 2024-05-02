/** @type {import('next').NextConfig} */
const { NextFederationPlugin } = require("@module-federation/nextjs-mf");

const nextConfig = {
  reactStrictMode: true,
  webpack: (config, options) => {
    const { isServer } = options;
    config.plugins.push(
      new NextFederationPlugin({
        name: "locations",
        filename: "static/chunks/remoteEntry.js",
        remotes: {
          home: `home@http://localhost:3000/_next/static/${isServer ? "ssr" : "chunks"}/remoteEntry.js`,
          checkout: `checkout@http://localhost:3001/_next/static/${isServer ? "ssr" : "chunks"}/remoteEntry.js`
        },
        exposes: {
          "./locations": "./pages/locations.tsx"
        }
      })
    );
    return config;
  }
};

module.exports = nextConfig;
