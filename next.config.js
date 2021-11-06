/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  webpack: (config, { dev }) => {
    config.module.rules.push(
      {
        test: /\.spec.test$/,
        loader: 'ignore-loader'
      }
    );
    return config;
  }
}
