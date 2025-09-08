/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
     images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;


