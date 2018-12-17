const path = require('path');

module.exports = {
    entry: './src/main.jsx',
    output: {
        path: path.resolve('./public'),
        filename: 'app.js'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.jsx/,
                loader: 'babel-loader',
                query: {
                    presets: ['@babel/react']
                }
            }
        ]
    }
}
