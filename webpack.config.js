const  path = require("path")

module.exports = {
    entry: {
        App:"./app/assets/scripts/App.js",
    },
        
    output: {
        path:path.resolve(__dirname, "./app/temp/scripts"),
        filename:"[name].js",
        publicPath: "/scripts"
    },
     
    module:{
        rules:[
            {
                loader: "babel-loader",
                test: /\.js$/,
                exclude: /node_modules/
            }
        ]
    }
}