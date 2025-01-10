/*
 * Copyright 2024 OpenBuild
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

module.exports = withBundleAnalyzer({
  // env: {
  //     NEXT_PUBLIC_ENV: 'PRODUCTION', //your next configs goes here
  // },
  output: 'standalone',
  reactStrictMode: true,
  swcMinify: true,
  staticPageGenerationTimeout: 180,
  experimental: {
    serverActions: true
  },
  env: {
    NEXT_PUBLIC_DOMAIN_ENV: process.env.NEXT_PUBLIC_DOMAIN_ENV,
  },
  images: {
    domains: [
      'openbuild.xyz',
      'assets.website-files.com',
      'images.unsplash.com',
      'img.foresightnews.pro',
      'statics.ambcrypto.com',
      's1.ax1x.com',
      'imgse.com',
      's3.us-west-1.amazonaws.com',
      'file-cdn.openbuild.xyz'
    ],
  },
  webpack: config => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding', 'bufferutil', 'utf-8-validate')
    return config
  },
  compiler: {
    styledComponents: true,
  },
})
