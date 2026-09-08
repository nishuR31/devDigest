/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Frontend-only project: no server, no API routes.
  // Uncomment the two lines below if you want a fully static export
  // (e.g. for GitHub Pages / any static host with no Node runtime):
  // output: "export",
  // images: { unoptimized: true },
  compress: true,
  poweredByHeader: false,
};

export default nextConfig;
