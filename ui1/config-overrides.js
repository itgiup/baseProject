const webpack = require('webpack');
const path = require('path');

console.log(path.resolve(__dirname, 'src'))
module.exports = function override(config, env) {
    config.resolve.fallback = {

        url: require.resolve('url'),
        assert: require.resolve('assert'),
        crypto: require.resolve('crypto-browserify'),
        console: false, //require.resolve('console-browserify'),
        http: require.resolve('stream-http'),
        https: require.resolve('https-browserify'),
        os: require.resolve('os-browserify/browser'),
        buffer: require.resolve('buffer'),
        stream: require.resolve('stream-browserify'),

    };

    config.resolve.alias = {
        '@': path.resolve(__dirname, 'src'),
    }
    
    config.plugins.push(
        new webpack.ProvidePlugin({
            process: 'process/browser',
            Buffer: ['buffer', 'Buffer'],
        }),
    );

    return config;
}