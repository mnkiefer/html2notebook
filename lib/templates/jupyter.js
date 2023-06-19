module.exports = {
  data2jupyter: (notebookData) => {
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
    let cells = [];
    notebookData.forEach(cell => {
      switch(cell.type) {
        case "code":
          cells.push({
            metadata: {},
            execution_count: null,
            outputs: [],
            cell_type: cell.type,
            source: cell.text.split('\n')
          })
          break;
        case "text":
          cells.push({
            attachments: {},
            metadata: {},
            cell_type: cell.type === "text" ? "markdown" : cell.type,
            source: cell.text.split('\n')
          })
          break;
      }
    })
    notebook.cells = cells;
    return notebook;
  }
}