"use strict"
var ssh2 = require("ssh2");
var util=require("util")
var events=require("events");
var Client = require("ssh2").Client;
var fs = require("fs");
var path = require('path');
var async = require('async');
var through = require('through');

function sshUtil(){
    this.conn = new Client();
}

/**
 * 描述：连接远程机器
 * 参数：server,远程机器凭证；
 *		then,回调函数
 */
sshUtil.prototype.connect = function(server, then) {
    var that = this;
    this.conn.on('ready', function(){
        if(then)
            then();
    }).on('error', function(err){
        console.log(server['host'] + ' error.');
        console.log(err);
    }).on('close', function(had_error){
        console.log(server['host'] + ' close.');
    }).connect(server);
};

/**
 * 描述：断开远程连接
 * 参数：then,回调函数
 */
sshUtil.prototype.disconnect = function(then) {
    this.conn.on('end', function() {
        if(then)
            then();
    });
    this.conn.end();
};

/**
 * 描述：执行shell命令
 * 参数：cmd,要执行的命令；
 *		then,回调函数
 * 回调：then(err, data):data 运行命令之后的返回信息
 */
sshUtil.prototype.exec = function(cmd, then) {
    this.conn.exec(cmd, function (err, stream) {
        var data = "";
        stream.pipe(through(function onWrite(buf) {
            data = data+buf;
        }, function onEnd() {
            stream.unpipe();
        }));
        stream.on('close', function () {
            console.log(cmd);
            if(then)
                then(null, ''+data);
        });
    });
};



/**
 * 描述：上传文件
 * 参数：localPath,本地路径
 *		remotePath,远程路径
 *		then,回调函数
 * 回调：then(err, result)
 */
sshUtil.prototype.uploadFile = function(localPath, remotePath, then) {
    this.conn.sftp(function(err, sftp){
        if(err){
            if(then)
                then(err);
        }else{
            sftp.fastPut(localPath, remotePath, function(err, result) {
                sftp.end();
                if(then)
                    then(err, result);
            });
        }
    });
};

/**
 * 描述：上传文件
 * 参数：localPath,本地路径
 *		remotePath,远程路径
 *		then,回调函数
 * 回调：then(err, result)
 */
sshUtil.prototype.downloadFile = function(remotePath, localPath, then) {
    this.conn.sftp(function(err, sftp){
        if(err){
            if(then)
                then(err);
        }else{
            sftp.fastGet(remotePath, localPath, function(err, result) {
                if(err){
                    if(then)
                        then(err);
                }else{
                    sftp.end();
                    if(then)
                        then(err, result);
                }
            });
        }
    });
};

/**
 * 描述：获取远程文件路径下文件列表信息
 * 参数  remotePath 远程路径；
 *		isFile 是否是获取文件，true获取文件信息，false获取目录信息；
 *		then 回调函数
 * 回调：then(err, dirs) ： dir, 获取的列表信息
 */
sshUtil.prototype.getFileOrDirList = function(remotePath, isFile, then) {
    var cmd = "find " + remotePath + " -type "+ (isFile == true ? "f":"d") + "\nexit\n";
    this.exec(cmd, function(err, data) {
        var arr = [];
        var dirs = [];
        arr = data.split("\r\n");
        arr.forEach(function(dir){
            if(dir.indexOf(remotePath) ==0) {
                dirs.push(dir);
            }
        });
        if(then)
            then(err, dirs);
    });
};


/**
 * 描述：控制上传或者下载一个一个的执行
 */
function Control(){
    events.EventEmitter.call(this);
}
util.inherits(Control, events.EventEmitter); // 使这个类继承EventEmitter

var control = new Control();

control.on("donext", function(todos, then){
    if(todos.length > 0){
        var func = todos.shift();
        func(function(err, result){
            if(err)	{
                then(err);
                return;
            }
            control.emit("donext", todos, then);
        });
    }else{
        then(null);
    }
});

/**
 * 描述：下载目录到本地
 * 参数: remotePath 远程路径；
 *		localDir 本地路径，
 *		then 回调函数
 * 回调：then(err)
 */
sshUtil.prototype.downloadDir = function(remoteDir, localDir, then) {
    var that = this;
    that.getFileOrDirList(remoteDir, false, function(err, dirs){
        if(err){
            if(then)
                then(err);
            return;
        }else{
            that.getFileOrDirList(remoteDir, true, function(err, files){
                if(err){
                    if(then)
                        then(err);
                }else{
                    dirs.shift();
                    dirs.forEach(function(dir){
                        var tmpDir = path.join(localDir, dir.slice(remoteDir.length+1)).replace(/[//]\g/, '\\');
                        // 创建目录
                        fs.mkdirSync(tmpDir);
                    });
                    var todoFiles = [];
                    files.forEach(function(file){
                        var tmpPath = path.join(localDir, file.slice(remoteDir.length+1)).replace(/[//]\g/, '\\');
                        todoFiles.push(function(done){
                            // that.downloadFile(file, tmpPath, done);
                            that.downloadFile(file, tmpPath, function(err, result){
                                done(err, result);
                            });
                            console.log("downloading the "+file);
                        });// end of todoFiles.push
                    });
                    control.emit("donext", todoFiles, then);
                }
            });
        }
    });
};

/**
 * 描述：获取windows上的文件目录以及文件列表信息
 * 参数：localDir 本地路径，
 *		dirs 目录列表
 *		files 文件列表
 */
function getFileAndDirList(localDir, dirs, files){
    var dir = fs.readdirSync(localDir);
    for(var i = 0; i < dir.length; i ++){
        var p = path.join(localDir, dir[i]);
        var stat = fs.statSync(p);
        if(stat.isDirectory())
        {
            dirs.push(p);
            getFileAndDirList(p, dirs, files);
        }
        else
        {
            files.push(p);
        }
    }
}


/**
 * 描述：上传文件到远程linux机器
 * 参数: remotePath 远程路径；
 *		localDir 本地路径，
 *		then 回调函数
 * 回调：then(err)
 */
var cnt = 0;
sshUtil.prototype.uploadDir = function(localDir, remoteDir, then) {
    var that = this;
    var dirs = [];
    var files = [];
    getFileAndDirList(localDir, dirs, files);

    // 创建远程目录
    var todoDir = [];
    var todoCmd = [];

    var fileName = 'tmp_'+ cnt +'.sh';
    cnt ++;
    var shCmdFile = fs.createWriteStream(fileName);

    dirs.forEach(function(dir){
        var to = path.join(remoteDir, dir.substring(localDir.length+1)).replace(/[\\]/g, '/');
        var cmd = "mkdir -p " + to +"\n";
        todoCmd.push(cmd);
        fs.appendFileSync(fileName, cmd, 'utf8');
    });
    shCmdFile.end();

    // 上传文件
    var todoFile = [];
    files.forEach(function(file){
        todoFile.push(function(done){
            var to  = path.join(remoteDir, file.substring(localDir.length+1)).replace(/[\\]/g, '/');
            console.log("upload " + file + ' to ' + to);
            that.uploadFile(file, to, function(err, result){
                done(err, result);
            });
        });
    });

    // 创建根目录
    that.exec('mkdir -p '+remoteDir+'\nexit\n', function (err, data) {
        console.log('mkdir -p '+remoteDir+'\nexit\n');
        if(err) {
            then(err);
        }else {
            // 上传命令，运行、删除命令
            that.uploadFile(fileName, remoteDir+'/'+fileName, function(err, result){
                fs.unlinkSync(fileName);// 删除命令文件
                if(err) throw err;
                that.exec('cd ' + remoteDir + '\nsh '+fileName+'\nrm -rf '+fileName+'\nexit\n', function(err, date){
                    control.emit("donext", todoFile, function(err){
                        if(err) throw err;
                        if(then)
                            then(err);
                    });
                });
            });
        }
    });
};

/**
 * 描述：创建目录
 * 参数: remoteDir 远程路径；
 *		then 回调函数
 * 回调：then(err, date) : data创建目录之后返回的信息
 */
sshUtil.prototype.mkdir = function (remoteDir, then) {
    var cmd = 'mkdir -p ' + remoteDir + '\nexit\n';
    this.exec(cmd, then);
};

/**
 *  描述：删除目录
 *  参数：remoteDir 远程路径
 *       then 回调函数
 *  回调：then(err, date) : data 删除之后返回的信息
 */
sshUtil.prototype.rmdir = function (remoteDir, then) {
    var cmd = 'rm -rf ' + remoteDir + '\nexit\n';
    this.exec(cmd, then);
};

module.exports = sshUtil;
