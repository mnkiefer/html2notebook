module.exports = {
  data2cap: (notebookData) => {
    const notebook = [];
    notebookData.forEach(cell => {
      notebook.push(
        { value: cell.text,
          language: cell?.language ? cell?.language : cell.type === "code" ? "shell" : "markdown",
          kind: cell.type === "code" ? 2 : 1
        })
    })
    return notebook;
  }
}