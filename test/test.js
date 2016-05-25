var creator = require("../index.js");
var bunyan = require('bunyan');
var log = bunyan.createLogger({name: "testHashReader"});
log.level("info");

describe('create-sqldeveloper-connections', function() {
    describe('#create', function() {
        it('should run test', function(done) {
            creator.create("../data/weblogic-scripted-test.txt","../data/connections.xml",'_TEST',function(err) {
                if (err) {
                    log.error(err);
                    return done();
                }
                log.info("pls check ../data/connections.xml");
                done();
            });
        });
        it('should run predprod', function(done) {
            creator.create("../data/weblogic-scripted-predprod.txt","../data/connections.xml",'_PREDPROD',function(err) {
                if (err) {
                    log.error(err);
                    return done();
                }
                log.info("pls check ../data/connections.xml");
                done();
            });
        });
        it('should run prod', function(done) {
            creator.create("../data/weblogic-scripted-prod.txt","../data/connections.xml",'_PROD',function(err) {
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

