//During the test the env variable is set to test
process.env.NODE_ENV="test";

let Patient=require("../models/patient");

//Require dev dependencies
let chai=require("chai");
let chaiHTTP=require("chai-http");
let server=require("../index");

let should=chai.should();

chai.use(chaiHTTP);
//parent block
describe("Patients Report Testing:", () => {
    let Token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmYzZDBmYTE5MGZlNTJlYWNkMWE2OWYiLCJuYW1lIjoic2FmYWlkLWFuc2FyaSIsInBhc3N3b3JkIjoiOTAxMjg3IiwiZW1haWwiOiJzYWZhaWRhbnNhcmkwN0BnbWFpbC5jb20iLCJjcmVhdGVkQXQiOiIyMDIyLTA4LTEwVDE1OjM4OjM0LjExNVoiLCJ1cGRhdGVkQXQiOiIyMDIyLTA4LTEwVDE1OjM4OjM0LjExNVoiLCJfX3YiOjAsImlhdCI6MTY2MDE0NjQyMCwiZXhwIjoxNjYxMTQ2NDIwfQ.0s40onzcDIF6kYCJdV-Kh-l6T0qLHg24ibSwsMf5axg";
    let auth = "Bearer "+Token;
    const patientID = "5f1ee3895f05cd0cf9819236"; //patient1
    /*
        * Test the /POST route
    */
    //1.If doctor is not Authorized to create the report
    describe("POST /api/v1/patients/id/create_report", () => {
      it("Error because Doctor is not Authorized:", (done) => {
        let report = {
          status: 0,
          doctor: "5f1ee32c3b5a6db5118f12af" ,//doctor id
        };
  
        chai
          .request(server)
          .post(`/api/v1/patients/${patientID}/create_report`)
          .send(report)
          .end((err, res) => {
            res.should.have.status(401);
            done();
          });
      });
    });
  
    //2.If the required field are not completed or missing
    describe("POST /api/v1/patients/id/create_report", () => {
      it("Error because of Incomplete data provided :", (done) => {
        let report = {
            status: 0,
            // doctor: "5f1ebef6b4bb9eafb132f4a9" ,
        };
  
        chai
          .request(server)
          .post(`/api/v1/patients/${patientID}/create_report`)
          .set("Content-Type", "application/x-www-form-urlencoded")
          .set("Authorization", auth)
          .send(report)
          .end((err, res) => {
            res.should.have.status(206);
            res.body.should.have.property("message");
            res.body.should.have.property("message").eql("Incomplete data provided");
            done();
          });
      });
    });
  
    //3.If the report succesfully Created in th DB
    describe("POST /api/v1/patients/id/create_report", () => {
      it("Report Successfully Created:", (done) => {
        let report = {
          status: 0,
          doctor: "5f1ee32c3b5a6db5118f12af" ,
        };
  
        chai
          .request(server)
          .post(`/api/v1/patients/${patientID}/create_report`)
          .set("Content-Type", "application/x-www-form-urlencoded")
          .set("Authorization", auth)
          .send(report)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property("message");
            res.body.should.have.property("message").eql("Report successfully Created");
            done();
          });
      });
    });
  });
  