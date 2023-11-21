const million = require('million/compiler');
/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = million.next(
  nextConfig, { auto: { rsc: true } }
);
