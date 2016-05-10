module.exports = {
    entry: "./app/module.js",
    devtool: 'source-map',
    output: {
        path: __dirname,
        filename: "./dist/bundle.js"
    },
    module: {
        loaders: [
            { 
                test: /\.css$/, 
                loader: "style!css" 
            },
            { 
                test: /\.js$/, 
                exclude: /node_modules/, 
                loader: "babel-loader",
                query: {
                    presets: ['es2015']
                }
            }
        ]
    }
};