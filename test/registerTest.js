//During the test the env variable is set to test
process.env.NODE_ENV="test";

let Patient=require("../models/patient");

//Require dev dependencies
let chai=require("chai");
let chaiHTTP=require("chai-http");
let server=require("../index");

let should=chai.should();

chai.use(chaiHTTP);
//Parent block
describe("Patients Register Testing :", () => {
    let Token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmYzZDBmYTE5MGZlNTJlYWNkMWE2OWYiLCJuYW1lIjoic2FmYWlkLWFuc2FyaSIsInBhc3N3b3JkIjoiOTAxMjg3IiwiZW1haWwiOiJzYWZhaWRhbnNhcmkwN0BnbWFpbC5jb20iLCJjcmVhdGVkQXQiOiIyMDIyLTA4LTEwVDE1OjM4OjM0LjExNVoiLCJ1cGRhdGVkQXQiOiIyMDIyLTA4LTEwVDE1OjM4OjM0LjExNVoiLCJfX3YiOjAsImlhdCI6MTY2MDE0NjQyMCwiZXhwIjoxNjYxMTQ2NDIwfQ.0s40onzcDIF6kYCJdV-Kh-l6T0qLHg24ibSwsMf5axg";
    let auth = "Bearer "+Token;
  
    /*
        * Test the /POST route
    */
   //1.If Doctor is not authorized
    describe("POST /api/v1/patients/register", () => {
      it("Eror because Doctor is not Authorized:", (done) => {
        let patient = {
          name: "patient11",
          phone: 100000001,
        };
  
        chai
          .request(server)
          .post("/api/v1/patients/register")
          .set("Content-Type", "application/x-www-form-urlencoded")
          .send(patient)
          .end((err, res) => {
            res.should.have.status(401);
            done();
          });
      });
    });
  
  //2.If form data is incomplete or missing
    describe("POST /api/v1/patients/register", () => {
      it("Error because of Incomplete data provided :", (done) => {
        let patient = {
          name: "patient12",
         // phone: 100000002,
        };
  
        chai
          .request(server)
          .post("/api/v1/patients/register")
          .set("Content-Type", "application/x-www-form-urlencoded")
          .set("Authorization", auth)
          .send(patient)
          .end((err, res) => {
            res.should.have.status(206);
            res.body.should.have.property("message");
            res.body.should.have.property("message").eql("Incomplete data provided");
            done();
          });
      });
    });
  
    //3.If Patient is already exists in DB
    describe("POST /api/v1/patients/register", () => {
      it("Patient already Exist:", (done) => {
        let patient = {
          name: "patient1",
          phone: 789456123,
        };
  
        chai
          .request(server)
          .post("/api/v1/patients/register")
          .set("Content-Type", "application/x-www-form-urlencoded")
          .set("Authorization", auth)
          .send(patient)
          .end((err, res) => {
            res.should.have.status(405);
            res.body.should.be.a("object");
            res.body.should.have.property("message");
            res.body.should.have.property("message").eql("Patient already Registered DB");
            done();
          });
      });
    });
  
   //4. If Patient is new then register the patient
    describe("POST /api/v1/patients/register", () => {
      it("Patient Successfully Registered:", (done) => {
        let patient = {
          name: "patient21",
          phone: 100000004,
        };
  
        chai
          .request(server)
          .post("/api/v1/patients/register")
          .set("Content-Type", "application/x-www-form-urlencoded")
          .set("Authorization", auth)
          .send(patient)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("message");
            res.body.should.have.property("message").eql("Patient Successfully Registered");
            done();
          });
      });
    });
  });
  