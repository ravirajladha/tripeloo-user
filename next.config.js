/**
 * @type {import('next').NextConfig}
 */

const nextConfig = {
	reactStrictMode: true,
	trailingSlash: true,
	experimental: {
		typedRoutes: true,
	},
	images: {
		unoptimized: true,
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'images.pexels.com',
				port: '',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'images.unsplash.com',
				port: '',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'a0.muscache.com',
				port: '',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'www.gstatic.com',
				port: '',
				pathname: '/**',
			},
		],
	},
}

module.exports = nextConfig

//trailingSlash and unptimized was true, while running npm run build as opening in new tab was giving 404
