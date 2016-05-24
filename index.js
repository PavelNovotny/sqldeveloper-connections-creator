/**
 *
 * Created by pavelnovotny on 02.10.15.
 */
var fs = require('fs');
var bunyan = require('bunyan');
var log = bunyan.createLogger({name: "bgzReader"});
log.level("error");


exports.create = function create(weblogicDatasources, connectionsFile, callback) {
    read(weblogicDatasources, function(err, data) {
        if (err) return callback(err);
        write(connectionsFile, data, function(err) {
            if (err) return callback(err);
        });
    });
}


function read(weblogicFile, callback) {
    var lineReader = require('readline').createInterface({
        input: require('fs').createReadStream(weblogicFile)
    });

    lineReader.on('line', function (line) {
        var arr = line.split(":");
        var data ={};
        console.log('Line from file:', line);
        if (arr.length > 4) { //service
            data.connectionName=arr[0].split("[")[0];
            data.host=arr[3].split("@")[1];
            data.port=arr[4].split("/")[0];
            console.log('connection name:', data.connectionName);
            console.log('host:', data.host);
            console.log('port:', data.port);
            if (arr.length === 5) { //service
                data.service=arr[4].split("/")[1].split("]")[0];
                data.user=arr[4].split("/")[1].split("]")[1].split("[")[1];
                data.passw=arr[4].split("/")[2].split("]")[0];
                console.log('service:', data.service);
                console.log('user:', data.user);
                console.log('passw:', data.passw);
            } else if (arr.length ===6) { //sid
                data.sid=arr[5].split("]")[0];
                data.user=arr[5].split("]")[1].split("[")[1].split("/")[0];
                data.passw=arr[5].split("]")[1].split("[")[1].split("/")[1];
                console.log('sid:', data.sid);
                console.log('user:', data.user);
                console.log('passw:', data.passw);
            }
            callback(null, data);
        }
    });
}

function write(file, data, callback) {
    fs.appendFile(file, data.host, function (err) {
        return callback(err);
    });
    fs.appendFile(file, data.port, function (err) {
        return callback(err);
    }); 
    return callback(null);
}




