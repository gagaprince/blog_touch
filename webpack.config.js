"use strict";
var fs = require('fs');
var path = require('path');

var rootPath = __dirname;
var entryPath = '/app/src/js/entry/'
var entryFiles = fs.readdirSync(path.join(rootPath,entryPath));
var entryObj = {};

entryFiles.forEach(function(file){
    var fileName = file.split('-')[0];
    entryObj[fileName]='.'+entryPath+file;
});

module.exports = {
    entry:entryObj,
    output: {
        filename: "[name].js"
    },
    resolve:{
        extensions:['','.js','.tpl','.css','.less']
    },
    module: {
        loaders: [
            {
                test: /\.css?$/,
                loader: "style!css"
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                // loaders: ['babel?cacheDirectory=false,presets[]=es2015,presets[]=stage-0'],
                option: {
                    'presets': ['latest'],
                },
                exclude: /node_modules/
            },
            {
                test: /\.tpl?$/,
                loader: "dot"
            },
            {
                test: /\.less?$/,
                loader: "style!css!less"
            }
        ]
    }
};