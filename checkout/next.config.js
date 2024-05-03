/** @type {import('next').NextConfig} */
const { NextFederationPlugin } = require("@module-federation/nextjs-mf");
const { FederatedTypesPlugin } = require("@module-federation/typescript");

const federationConfig = (isServer) => ({
  name: "checkout",
  filename: "static/chunks/remoteEntry.js",
  remotes: {
    home: `home@http://localhost:3000/_next/static/${isServer ? "ssr" : "chunks"}/remoteEntry.js`,
    locations: `locations@http://localhost:3002/_next/static/${isServer ? "ssr" : "chunks"}/remoteEntry.js`
  },
  exposes: {
    "./basket": "./components/Basket.tsx",
    "./checkout": "./pages/checkout.tsx"
  },
  extraOptions: {
    exposePages: true
  }
});

const nextConfig = {
  reactStrictMode: true,
  webpack: (config, options) => {
    const { isServer } = options;
    config.optimization.runtimeChunk = "single";
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
