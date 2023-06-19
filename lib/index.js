const fs = require('fs');
const getNotebookData = require('./getNotebookData');
const parser = require('./parser');

const { data2cap, data2jupyter } = require('./templates/index');

module.exports = {
  html2notebook: (userConfig) => {

    if (!userConfig.inputFile) {
      throw new Error('ERROR: Missing HTML input file. Nothing to convert.');
    }

    const notebookData = getNotebookData(parser(userConfig));

    let notebook;
    switch(userConfig.type) {
      case "cap":
        notebook = data2cap(notebookData);
        break;
      case "jupyter":
        notebook = data2jupyter(notebookData);
        break;
    }

    const notebookString = JSON.stringify(notebook, null, 4);
    if (userConfig.outputFile) {
      fs.writeFileSync(userConfig.outputFile, notebookString, 'utf8');
    } else {
      process.stdout.write(`${notebookString}\n`);
    }

  }
};
