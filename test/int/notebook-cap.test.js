const fs = require('fs');
const path = require('path');

const { html2notebook } = require('../../lib/index');

const dataDir = path.join(__dirname, '../data');
const readFile = (file) => fs.readFileSync(file, 'utf8');

describe('Convert "${inputFile}"', () => {
  const inputFile = path.join(dataDir, 'text-with-code.html');
  const outputFile = path.join(dataDir, 'text-with-code.capnb');
  const outputFileExp = path.join(dataDir, 'text-with-code-exp.capnb');

  afterEach(() => {
    if (fs.existsSync(outputFile)) {
      fs.unlinkSync(outputFile);
    }
  })

  test(`Missing input file`, () => {
    readFile(inputFile);
    const config = {
      type: 'cap',
      outputFile,
    };

    expect(() => { html2notebook(config) })
      .toThrow('ERROR: Missing HTML input file. Nothing to convert.');
  });

  test(`Valid config`, () => {
    readFile(inputFile);
    const config = {
      type: 'cap',
      inputFile,
      outputFile,
    };
    html2notebook(config);

    expect(readFile(outputFile)).toEqual(readFile(outputFileExp));
  });
});
