const path = require('path');

module.exports = {
    entry: {
        'WebRecorder': './src/WebRecorder.js'
    },
    output: {
        filename: '[name].min.js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'window',
        library: '[name]'
    },
    externals: {
        'jquery': {
            commonjs: 'jQuery',
            commonjs2: 'jQuery',
            amd: 'jQuery',
            root: '$'
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015']
                    }
                }
            }
        ]
    }
};