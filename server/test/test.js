var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.should();
var server = require('../server')
var fs = require('fs');

function readFile() {

    //@description:read file from json

    var data = fs.readFileSync('/home/admin1/Desktop/Pradeep/chatApp/server/test/test.json');
    var data1 = JSON.parse(data);
    return data1;
}
/**
 * @description:test script for registration 
 */
describe('Status and content', function () {
    describe('Registration page', function () {
        var data1 = readFile();
        it('status ', function (done) {
            chai.request(server).post('/register').send(data1.registration).end((err, res) => {
                // console.log("register------->",res.body);

                if (err) {
                    console.log("expect ==>", err);
                    err.should.have.status(500);
                } else {
                    console.log("expect result ==>", res.body);
                    res.should.have.status(200);
                    /**
                     * @description:test script for login
                     */
                    describe('Login page', function () {
                        it('status ', function (done) {
                            chai.request(server).post('/login').send(data1.login).end((err, res) => {
                                if (err) {
                                    console.log("expect ==>", err);
                                } else {
                                    console.log("expect ==>", res.body);
                                    res.should.have.status(200);
                                    done()
                                }
                            })
                        })
                    })
                    done()
                }
            })
        })
    })
})

// TO test npm test