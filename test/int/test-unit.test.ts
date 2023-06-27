import * as fs from 'fs';
import * as path from 'path';

import { describe, expect, test } from '@jest/globals';
import { html2notebook } from '../../src/index';

const dataDir = path.join(__dirname, '../data');
const tmpDir = path.join(dataDir, 'tmp');
const parseNotebook = (file: any) => JSON.parse(fs.readFileSync(file, 'utf8'));

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
    //@ts-ignore
    expect(() => { html2notebook() })
      .toThrow('Missing input: Please provide a filePath, html string or a dom.');
  });

  test(`Invalid input file`, () => {
    const config = {};
    //@ts-ignore
    expect(() => { html2notebook({}, config) })
      .toThrow('Invalid input: Could not detect Dom with children.');
  });

  test(`Valid empty config`, () => {
    const outputFileExp = path.join(dataDir, 'text-with-code-exp.ipynb');
    const config = {};
    const notebook = html2notebook(inputFile, config);
    expect(notebook).toMatchObject(parseNotebook(outputFileExp));
  });
  test(`Valid outputFile`, () => {
    const outputFile = path.join(tmpDir, 'text-with-code.capnb');
    const outputFileExp = path.join(dataDir, 'text-with-code-exp.capnb');
    const config = { type: 'cap', outputFile };
    html2notebook(inputFile, config);
    expect(parseNotebook(outputFile)).toMatchObject(parseNotebook(outputFileExp));
  });

  test(`Valid "cap" config with styles`, () => {
    const outputFileExp = path.join(dataDir, 'styled-text-with-code.capnb');
    const config = { type: 'cap', styles: `* { font-weight: bold; }` };
    const notebook = html2notebook(inputFile, config);
    expect(notebook).toMatchObject(parseNotebook(outputFileExp));
  });

  test(`Valid "jupyter" config with output file`, () => {
    const outputFile = path.join(tmpDir, 'text-with-code.ipynb');
    const outputFileExp = path.join(dataDir, 'text-with-code-exp.ipynb');
    const config = { type: 'jupyter', outputFile };
    html2notebook(inputFile, config);
    expect(parseNotebook(outputFile)).toMatchObject(parseNotebook(outputFileExp));
  });

});
