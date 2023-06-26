import { CapNotebookCell, NotebookCell } from "../types";

export default (notebookCells: NotebookCell[], styles = ''): CapNotebookCell[] => {
  const notebook: any = [];
  notebookCells.forEach((cell: NotebookCell) => {
    notebook.push(
      {
        value: (styles && !cell.isCode) ? `<style>\n${styles.trim()}\n</style>\n\n${cell.text}` : cell.text,
        language: cell['language'] ? cell['language'] : cell.isCode ? "shell" : "markdown",
        kind: cell.isCode ? 2 : 1
      })
  })
  return notebook;
}