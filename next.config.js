const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	sassOptions: {
		includePaths: [path.join(__dirname, 'styles')],
	},
}

module.exports = {
    // ... other configuration options ...
    webpack: (config) => {
        // Add babel-loader configuration
        config.module.rules.push({
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['next/babel'],
                },
            },
        });

        return config;
    },
};
