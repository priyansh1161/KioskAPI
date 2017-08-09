const request = require('request');
const checkValidResponse = require('./helpers/checkValidResponse');

const URL = 'https://webkiosk.jiit.ac.in/CommonFiles/UserActionn.jsp';

module.exports = ({ college = 'JIIT', enrollmentNumber, dateOfBirth, password }) => {
  const data = {
    txtInst: 'Institute',
    InstCode: college,
    txtuType: 'Member Type',
    UserType: 'S',
    txtCode: 'Enrollment No',
    MemberCode: enrollmentNumber,
    DOB: 'DOB',
    DATE1: dateOfBirth,
    txtPin: 'Password/Pin',
    Password: password,
    BTNSubmit: 'Submit',
  };
  return new Promise((resolve, reject) => {
    request({
      url: URL,
      method: 'POST',
      data,
    }, requestCallback);
    function requestCallback(err, response) {
      console.log(response.statusCode);
      if (err || !checkValidResponse(response.statusCode)) {
        reject(err);
      } else {
        console.log(JSON.stringify(response, null, 2));
        const cookie = request.cookie(response.headers['set-cookie'][0]);
        resolve(cookie);
      }
    }
  });
};
