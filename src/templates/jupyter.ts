import { JupyterNotebookMeta, NotebookCell } from "../types";

export default (notebookCells: NotebookCell[], styles = ''): JupyterNotebookMeta => {
  const notebook = {
    metadata: {
      language_info: {
        name: "python"
      },
      orig_nbformat: 4
    },
    nbformat: 4,
    nbformat_minor: 2,
    cells: []
  };
  let cells: any = [];
  notebookCells.forEach((cell: NotebookCell) => {
    switch (cell.isCode) {
      case true:
        cells.push({
          metadata: {},
          execution_count: null,
          outputs: [],
          cell_type: "code",
          source: cell.text.split('\n')
        })
        break;
      case false:
        const text = styles ? `<style>\n${styles.trim()}\n</style>\n\n${cell.text}` : cell.text;
        cells.push({
          attachments: {},
          metadata: {},
          cell_type: "markdown",
          source: text.split('\n')
        })
        break;
    }
  })
  notebook.cells = cells;
  return notebook;
}