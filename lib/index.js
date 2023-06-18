const buildNotebook = require('./buildNotebook');
const parser = require('./parser');

module.exports = {
  capTemplate: './templates/index',
  html2notebook: (userConfig) => {

    if (!userConfig.inputFile) {
      throw new Error('ERROR: Missing HTML input file. Nothing to convert.');
    }

    buildNotebook(parser(userConfig));
  },
};
