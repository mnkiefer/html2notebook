import type { Document, NodeWithChildren } from 'domhandler';

export type HtmlInput = string | Document | NodeWithChildren;
export type Dom = NodeWithChildren;

export interface NotebookOptions {
    type?: string;
    outputFile?: string;
    styles?: string;
    nodeIsIgnored?: Function;
    nodeIsCode?: Function;
    getCodeCells?: Function;
    getRootNode?: Function;
    replaceNode?: Function;
}

export interface NotebookCell {
    text: string;
    isCode: boolean;
    [key: string]: any;
}

export interface CapNotebookCell {
    value: string;
    language: string;
    kind: 1 | 2;
}

export interface JupyterNotebookTextCell {
    attachments: {},
    metadata: {},
    cell_type: "markdown",
    source: string;
}

export interface JupyterNotebookCodeCell {
    metadata: {},
    execution_count: number,
    outputs: [],
    cell_type: "code",
    source: string;
}

export type JupyterNotebookCell = JupyterNotebookCodeCell | JupyterNotebookTextCell;

export interface JupyterNotebookMeta {
    metadata: {
        language_info: {
          name: string;
        },
        orig_nbformat: number;
      },
      nbformat: number;
      nbformat_minor: number;
      cells: JupyterNotebookCell[]
}