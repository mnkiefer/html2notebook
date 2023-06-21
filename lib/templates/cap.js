module.exports = {
  data2cap: (notebookData, styles='') => {
    const notebook = [];
    notebookData.forEach(cell => {
      notebook.push(
        { value: (styles && cell.type === "text") ? `<style>${styles}</style>\n\n${cell.text}` : cell.text,
          language: cell?.language ? cell?.language : cell.type === "code" ? "shell" : "markdown",
          kind: cell.type === "code" ? 2 : 1
        })
    })
    return notebook;
  }
}