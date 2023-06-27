import * as fs from 'fs';

import getCells from './getCells';
import getDom from './getDom';

import * as templates from './templates';

import type { HtmlInput, NotebookCell, NotebookOptions } from './types';

export type * as types from './types';
export * as templates from './templates';

/**
 * Converts HTML input to the configured notebook
 * @param {HtmlInput} input Input can be a file path, HTML string or Dom object
 * @param {NotebookOptions} config Optional notebook configuration options
 * @returns Notebook object as configured by the options type
 * {@link html2notebook}
 */
export function html2notebook(input: HtmlInput, config: NotebookOptions) {
  return cells2notebook(config, html2cells(input, config));
}

/**
 * Converts HTML input to a generic notebook cell object
 * @param {HtmlInput} input Input can be a file path, HTML string or Dom object
 * @param {NotebookOptions} config Optional notebook configuration options
 * @returns Generic Notebook object
 */
export function html2cells(input: HtmlInput, config: NotebookOptions ): NotebookCell[] {
  return getCells(
    getDom(input),
    config
  );
}

/**
 * Converts generic notebook cell object to the notebook object
 * as configured by the options type
 * @param config Optional notebook configuration options
 * @param cells Generic Notebook object
 * @returns Notebook object as configured by the options type or
 * undefined if configuration option outputFile is provided
 */
export function cells2notebook(config: NotebookOptions, cells: NotebookCell[]) {
  let notebook;
  switch(config?.type) {
    case "cap":
      notebook = templates.cap(cells, config?.styles);
      break;
    case "jupyter":
      notebook = templates.jupyter(cells, config?.styles);
      break;
    default:
      notebook = templates.jupyter(cells, config?.styles);
      break;
  }
  if (config?.outputFile) {
    fs.writeFileSync(config?.outputFile, JSON.stringify(notebook, null, 4), 'utf8');
    console.log(`> Notebook written to file "${config?.outputFile}"`);
    return
  }
  return notebook;
}