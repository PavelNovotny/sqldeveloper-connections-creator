/**
 *
 * Created by pavelnovotny on 02.10.15.
 */
var fs = require('fs');
var bunyan = require('bunyan');
var log = bunyan.createLogger({name: "bgzReader"});
log.level("error");


exports.create = function create(weblogicDatasources, connectionsFile, callback) {
    read(weblogicDatasources, function(err) {
        if (err) return callback(err);
        write(connectionsFile, function(err) {
            if (err) return callback(err);
        });
        return callback(null);
    });
}


function read(weblogicFile, callback) {
    return callback(null);
}

function write(file, callback) {
    return callback(null);
}




