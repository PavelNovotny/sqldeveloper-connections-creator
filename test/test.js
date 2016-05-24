var creator = require("../index.js");
var bunyan = require('bunyan');
var log = bunyan.createLogger({name: "testHashReader"});
log.level("info");

describe('create-sqldeveloper-connections', function() {
    describe('#create', function() {
        it('should run the module function', function(done) {
            creator.create("../data/weblogic-scripted.txt","../data/connections.xml",function(err) {
                if (err) {
                    log.error(err);
                    return done();
                }
                log.info("pls check ../data/connections.xml");
                done();
            });
        });
    });
});

