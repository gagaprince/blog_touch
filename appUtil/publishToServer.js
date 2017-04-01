"use strict";
var Promise = require('promise');
var SU = require('./ssh');
var ssh = new SU();
var conf = require('../confige/conf');

var serverOp = {
    connect:function(){
        return new Promise(function(resolve, reject) {
            ssh.connect(conf.server,function(){
                console.log("connect");
                resolve();
            });
        });
    },
    disconnect:function(){
        return new Promise(function(resolve, reject) {
            ssh.disconnect(function(){
                console.log("disconnect");
                resolve();
            });
        });
    },
    pull:function(){
        return new Promise(function(resolve, reject) {
            ssh.exec('cd /root/work/blog && ls -l && git pull',function(err,data){
                if (err) {
                    console.log(err);
                } else {
                    console.log(data);
                    resolve(data);
                }
            });
        });
    },
    kill:function(){
        return new Promise(function(resolve, reject) {
            ssh.exec('killall -9 java ',function(err,data){
                if (err) {
                    console.log(err);
                } else {
                    console.log(data);
                    resolve(data);
                }
            });
        });
    },
    restart:function(){
        return new Promise(function(resolve, reject) {
            ssh.exec('source /etc/profile && echo $PATH && sh /root/gagaTest/sharetab/restart_blog.sh > /root/work/blog/nohup.out 2>&1',function(err,data){
                if (err) {
                    console.log(err);
                } else {
                    console.log(data);
                    resolve(data);
                }
            });
        });
    },
    forFun:function(cb){
        return function(){
            return new Promise(function(resolve, reject) {
                resolve();
                if(cb){
                    cb();
                }
            });
        }
    },
    connectAndPull:function(cb){
        this.connect()
            .then(this.pull)
            .then(this.disconnect)
            .then(this.forFun(cb));
    },
    connectAndPullAndRestart:function(cb){
        this.connect()
            .then(this.pull)
            .then(this.kill)
            .then(this.restart)
            .then(this.disconnect)
            .then(this.forFun(cb));
    }
}

module.exports = serverOp;

