const fs = require('fs');
const path = require('path');

const { html2notebook } = require('../../lib/index');

const dataDir = path.join(__dirname, '../data');
const tmpDir = path.join(dataDir, 'tmp');
const parseNotebook = (file) => JSON.parse(fs.readFileSync(file, 'utf8'));

describe('Convert "${inputFile}"', () => {
  let inputFile = path.join(dataDir, 'text-with-code.html');

  beforeEach(() => {
    if (!fs.existsSync(tmpDir)) {
      fs.mkdirSync(tmpDir);
    }
  })

  afterEach(() => {
    if (fs.existsSync(tmpDir)) {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    }
  })

  test(`Missing input file`, () => {
    const config = { type: 'cap' };
    expect(() => { html2notebook(config) })
      .toThrow('ERROR: Missing HTML input file. Nothing to convert.');
  });

  test(`Valid "cap" config`, () => {
    const outputFileExp = path.join(dataDir, 'text-with-code-exp.capnb');
    const config = { type: 'cap', inputFile };
    const notebook = html2notebook(config);
    expect(notebook).toMatchObject(parseNotebook(outputFileExp));
  });

  test(`Valid "cap" config with styles`, () => {
    const outputFile = path.join(tmpDir, 'styled-text-with-code.capnb');
    const outputFileExp = path.join(dataDir, 'styled-text-with-code.capnb');
    const config = { type: 'cap', inputFile, styles: `* { font-weight: bold; }` };
    const notebook = html2notebook(config);
    expect(notebook).toMatchObject(parseNotebook(outputFileExp));
  });

  test(`Valid "jupyter" config with output file`, () => {
    const outputFile = path.join(tmpDir, 'text-with-code.ipynb');
    const outputFileExp = path.join(dataDir, 'text-with-code-exp.ipynb');
    const config = { type: 'jupyter', inputFile, outputFile };
    html2notebook(config);
    expect(parseNotebook(outputFile)).toMatchObject(parseNotebook(outputFileExp));
  });

});
