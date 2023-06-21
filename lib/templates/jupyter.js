module.exports = {
  data2jupyter: (notebookData, styles='') => {
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
          const text = styles ? `<style>\n${styles.trim()}\n</style>\n\n${cell.text}` : cell.text;
          cells.push({
            attachments: {},
            metadata: {},
            cell_type: cell.type === "text" ? "markdown" : cell.type,
            source: text.split('\n')
          })
          break;
      }
    })
    notebook.cells = cells;
    return notebook;
  }
}