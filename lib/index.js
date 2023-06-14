import { html2notebook } from './html2notebook.js';
import { parser } from './parser.js';
export { capTemplate } from './notebooks/index.js';

export const buildNotebook = async (userConfig) => {
    html2notebook(await parser(userConfig));
}

