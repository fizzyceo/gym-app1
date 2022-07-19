/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    domains: [
      'd205bpvrqc9yn1.cloudfront.net',
      'i.ytimg.com',
      'lh3.googleusercontent.com',
    ],
  },
};

module.exports = nextConfig;
