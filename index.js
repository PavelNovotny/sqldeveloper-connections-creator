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
    var lineReader = require('readline').createInterface({
        input: require('fs').createReadStream(weblogicFile)
    });

    lineReader.on('line', function (line) {
        var arr = line.split(":");
        console.log('Line from file:', line);
        if (arr.length > 4) { //service
            var connectionName=arr[0].split("[")[0];
            var host=arr[3].split("@")[1];
            var port=arr[4].split("/")[0];
            console.log('connection name:', connectionName);
            console.log('host:', host);
            console.log('port:', port);
            if (arr.length === 5) { //service
                var service=arr[4].split("/")[1].split("]")[0];
                var user=arr[4].split("/")[1].split("]")[1].split("[")[1];
                var passw=arr[4].split("/")[2].split("]")[0];
                console.log('service:', service);
                console.log('user:', user);
                console.log('passw:', passw);
            } else if (arr.length ===6) { //sid
                var sid=arr[5].split("]")[0];
                var user=arr[5].split("]")[1].split("[")[1].split("/")[0];
                var passw=arr[5].split("]")[1].split("[")[1].split("/")[1];
                console.log('sid:', sid);
                console.log('user:', user);
                console.log('passw:', passw);
            }
        }
    });
 return callback(null);
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




