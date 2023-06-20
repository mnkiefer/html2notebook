const fs = require('fs');
const path = require('path');

const templates = require('../../lib/templates');

const dataDir = path.join(__dirname, '../data');

describe('Testing templates', () => {

  test(`Testing "cap"`, () => {
    expect(Object.keys(templates)).toEqual(["data2cap", "data2jupyter"]);
  });

});
