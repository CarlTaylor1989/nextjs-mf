/** @type {import('next').NextConfig} */
const { NextFederationPlugin } = require("@module-federation/nextjs-mf");
const { FederatedTypesPlugin } = require("@module-federation/typescript");

const federationConfig = (isServer) => ({
  name: "locations",
  filename: "static/chunks/remoteEntry.js",
  remotes: {
    home: `home@http://localhost:3000/_next/static/${isServer ? "ssr" : "chunks"}/remoteEntry.js`,
    checkout: `checkout@http://localhost:3001/_next/static/${isServer ? "ssr" : "chunks"}/remoteEntry.js`
  },
  exposes: {
    "./locations": "./pages/locations.tsx"
  }
});

const nextConfig = {
  reactStrictMode: true,
  webpack: (config, options) => {
    const { isServer } = options;
    config.plugins.push(
      new NextFederationPlugin(federationConfig(isServer)),
      new FederatedTypesPlugin({
        federationConfig: federationConfig(isServer)
      })
    );
    return config;
  }
};

module.exports = nextConfig;
