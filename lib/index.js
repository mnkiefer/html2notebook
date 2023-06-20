const fs = require('fs');
const getNotebookData = require('./getNotebookData');
const parser = require('./parser');

const { data2cap, data2jupyter } = require('./templates/index');

module.exports = {
  html2data,
  data2notebook,
  html2notebook: (userConfig) => data2notebook(userConfig, html2data(userConfig))
};

function html2data(userConfig) {
  if (!userConfig.inputFile) {
    throw new Error('ERROR: Missing HTML input file. Nothing to convert.');
  }
  return getNotebookData(parser(userConfig));
}

function data2notebook(userConfig, notebookData) {
  let notebook;
  switch(userConfig.type) {
    case "cap":
      notebook = data2cap(notebookData);
      break;
    case "jupyter":
      notebook = data2jupyter(notebookData);
      break;
  }
  if (userConfig.outputFile) {
    fs.writeFileSync(userConfig.outputFile, JSON.stringify(notebook, null, 4), 'utf8');
    console.log(`INFO: Notebook written to file "${userConfig.outputFile}"`);
    return
  }
  return notebook;
}
