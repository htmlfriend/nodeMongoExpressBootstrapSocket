const request = require('request');

describe('calc', () => {
  it('should multiply 2 and 2', () => {
    expect(2 * 2).toBe(4);
  });
});

describe('get messages', () => {
  it('should return 200 ok', (done) => {
    request.get('http://localhost:3000/messages', (err, res) => {
      // console.log(res.body);
      expect(res.statusCode).toEqual(200);
      done();
    });
  });
  it('should return list , thats not empty', (done) => {
    request.get('http://localhost:3000/messages', (err, res) => {
      // console.log(res.body);
      expect(JSON.parse(res.body).length).toBeGreaterThan(0);
      console.log('length', JSON.parse(res.body).length);
      done();
    });
  });
});

describe('get messages from user', () => {
  it('should return 200 ok', (done) => {
    request.get('http://localhost:3000/messages/tim', (err, res) => {
      // console.log(res.body);
      expect(res.statusCode).toEqual(200);
      done();
    });
  });
  it('name should be tim', (done) => {
    request.get('http://localhost:3000/messages/tim', (err, res) => {
      // console.log(res.body);
      expect(JSON.parse(res.body)[0].name).toEqual('tim');
      done();
    });
  });
});