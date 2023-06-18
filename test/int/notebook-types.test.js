const fs = require('fs');
const path = require('path');

const { html2notebook } = require('../../lib/index');

const dataDir = path.join(__dirname, '../data');
const readFile = (file) => fs.readFileSync(file, 'utf8');

describe('Convert "${inputFile}"', () => {
  let inputFile = path.join(dataDir, 'text-with-code.html');
  let outputFile, outputFileExp;

  afterEach(() => {
    if (fs.existsSync(outputFile)) {
      //fs.unlinkSync(outputFile);
    }
  })

  outputFile = path.join(dataDir, 'text-with-code.capnb');
  outputFileExp = path.join(dataDir, 'text-with-code-exp.capnb');
  test(`Missing input file`, () => {
    readFile(inputFile);
    const config = { type: 'cap', outputFile };
    expect(() => { html2notebook(config) })
      .toThrow('ERROR: Missing HTML input file. Nothing to convert.');
  });

  test(`Valid "cap" config`, () => {
    readFile(inputFile);
    const config = { type: 'cap', inputFile, outputFile };
    html2notebook(config);
    expect(readFile(outputFile)).toEqual(readFile(outputFileExp));
  });

  outputFile = path.join(dataDir, 'text-with-code.ipynb');
  outputFileExp = path.join(dataDir, 'text-with-code-exp.ipynb');
  test(`Valid "jupyter" config`, () => {
    readFile(inputFile);
    const config = { type: 'jupyter', inputFile, outputFile };
    html2notebook(config);
    expect(readFile(outputFile)).toEqual(readFile(outputFileExp));
  });

});
