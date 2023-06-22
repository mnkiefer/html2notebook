const fs = require('fs');

const { parseDocument } = require('htmlparser2');

function sanitizeConfig(config) {
  const notebookType = config.type || 'cap';

  const { notebook } = require(`./templates/${notebookType}.js`);

  const inputFile = config.inputFile;
  const outputFile = config.outputFile ? config.outputFile : '';
  const styles = config.styles || '';

  const nodeIsIgnored = config.nodeIsIgnored ? config.nodeIsIgnored : () => false;
  const nodeIsCode = config.nodeIsCode ? config.nodeIsCode : (node) => (node?.type === 'tag' && node?.name === 'code');

  const getRootNode = config.getRootNode ? config.getRootNode : undefined;
  const getCodeCells = config.getCodeCells ? config.getCodeCells : undefined;

  return {
    inputFile,
    outputFile,
    styles,
    nodeIsIgnored,
    nodeIsCode,
    getRootNode,
    getCodeCells,
    notebook,
  };
}

module.exports = (config) => {
  let userConfig = { ...config };
  userConfig = sanitizeConfig(config);

  const htmlInput = fs.readFileSync(config.inputFile, 'utf8')
  const dom = parseDocument(htmlInput);

  return { config: userConfig, dom };
};
