/** @type {import('next').NextConfig} */
// module.exports = {
//   webpack: (config, _) => ({
//     ...config,
//     watchOptions: {
//       ...config.watchOptions,
//       poll: 800,
//       aggregateTimeout: 300,
//     },
//   }),
// }

const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig