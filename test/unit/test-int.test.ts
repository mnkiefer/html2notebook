import * as fs from 'fs';
import * as path from 'path';

import { parseDocument } from 'htmlparser2';
import { describe, expect, test } from '@jest/globals';
import getCells from '../../src/getCells';
import * as templates from '../../src/templates';

describe('Testing templates', () => {

  test('Check template loading', () => {
    const files = fs.readdirSync(path.join(__dirname, '../../src/templates'))
      .filter(f => f !== 'index.ts').map(f => f.replace('.ts', ''));
    expect(Object.keys(templates)).toEqual(files);
  });

  test('Fail when replaceNode() alters node parent', () => {
    const dom = parseDocument('<html><div class="parent"><div class="child"></div></div></html>');
    expect(() => {
      getCells(dom, {
        replaceNode: (node: any) => {
          if (node?.attribs?.class === "child") node.parent = 'Another Parent';
          return node;
        }
      })
    }).toThrow('Node and replaced node parents must be the same! Ensure they are the same for the algorithm will not work.');
  });

});