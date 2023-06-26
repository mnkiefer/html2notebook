import * as fs from 'fs';
import { parseDocument } from 'htmlparser2';
import type { HtmlInput } from './types';

import type { Document } from 'domhandler';

export default (input: HtmlInput): Document => {
  let dom;
  if (!input) {
    throw new Error('Missing input: Please provide a filePath, html string or a dom.');
  }
  if (typeof input === "string" && fs.statSync(input).isFile()) {
    const html = fs.readFileSync(input, 'utf8')
    dom = parseDocument(html);
  } else if (typeof input === "string") {
    dom = parseDocument(input);
  } else if (input.hasOwnProperty('children')) {
    dom = <Document>input;
  } else {
    throw new Error('Invalid input: Could not detect Dom with children.');
  }
  return dom;
}
