const fs = require('fs');
const {
  nodeHasChildren, nodeIsTag, getOpenTag, getCloseTag, getText, getCodeText,
} = require('./helpers');

function getRootPath(leaf, nodeIsCode) {
  if (nodeIsCode(leaf)) {
    return [];
  }
  const rootPath = leaf?.type === 'tag' ? [leaf] : [];
  let parent = leaf?.parent;

  while (parent && nodeIsTag(parent)) {
    rootPath.push(parent);
    parent = parent?.parent;
  }
  return rootPath.reverse();
}

function countTags2Close(openTagStack, rootPath) {
  for (let i = 0; i < openTagStack.length; i += 1) {
    if (openTagStack[i] !== rootPath[i]) {
      return openTagStack.length - i;
    }
  }
  return 0;
}

function writeCells(
  { CELL_TYPE_CODE, CELL_TYPE_TEXT, NAME_KEY_VALUE },
  cells,
  openTagStack,
  rootPath = [],
  text = undefined,
  hasCellTypeChanged = false,
) {
  const nbcells = { ...cells };
  const numTagsToClose = countTags2Close(openTagStack, rootPath);
  // countTags2Close will always return 0 for the first rootPath and this loop will be skipped
  for (let i = 0; i < numTagsToClose; i += 1) {
    if (nbcells[cells.length - (hasCellTypeChanged ? CELL_TYPE_CODE
      : CELL_TYPE_TEXT)]) {
    nbcells[cells.length - (hasCellTypeChanged ? CELL_TYPE_CODE
      : CELL_TYPE_TEXT)][NAME_KEY_VALUE] += getCloseTag(openTagStack.pop());
    }
    if (i === numTagsToClose.length - 1) {
      nbcells[cells.length - (hasCellTypeChanged ? CELL_TYPE_CODE
        : CELL_TYPE_TEXT)][NAME_KEY_VALUE] = cells[cells.length
          - (hasCellTypeChanged ? CELL_TYPE_CODE : CELL_TYPE_TEXT)][NAME_KEY_VALUE].trim();
    }
  }
  // rootPath will be empty for code cells and this loop will be skipped
  for (let i = openTagStack.length; i < rootPath.length; i += 1) {
    nbcells[cells.length - 1][NAME_KEY_VALUE] += getOpenTag(rootPath[i]);
    openTagStack.push(rootPath[i]);
  }
  if (text && text.replace(/\s/g, '').length) {
    nbcells[cells.length - 1][NAME_KEY_VALUE] += text;
  }
}

module.exports = ({ config, dom }) => {
  const {
    outputFile, notebook, styles,
    nodeIsIgnored, nodeIsCode, getRootNode, getCodeCells, getTextCells,
  } = config;
  const {
    TOP_LEVEL, CODE_CELL, TEXT_CELL, CELL_TYPE_CODE, CELL_TYPE_TEXT, NAME_KEY_TYPE, NAME_KEY_VALUE,
  } = notebook;

  const root = getRootNode ? getRootNode(dom) : dom;
  const nodeStack = root.children;

  const cells = [];
  const openTagStack = [];
  const visitedNodes = [];

  while (nodeStack.length > 0) {
    const node = nodeStack.pop();

    if (node === null) break;
    if (node in visitedNodes) break;

    visitedNodes.push(node);

    if (!nodeIsIgnored(node)) {
      const cellType = nodeIsCode(node) ? CELL_TYPE_CODE : CELL_TYPE_TEXT;

      // Only keep moving down the tree for non-code nodes
      if (nodeHasChildren(node) && cellType === CELL_TYPE_TEXT) {
        node.children.reverse().forEach((child) => nodeStack.push(child));
      } else {
        const hasCellTypeChanged = (
          !cells.length || cells[cells.length - 1]?.[NAME_KEY_TYPE] !== cellType
        );

        let newCells = [];
        switch (cellType) {
          case CELL_TYPE_CODE:
            newCells = getCodeCells ? getCodeCells(node)
              : [{ ...CODE_CELL, [NAME_KEY_VALUE]: getCodeText(node) }];
            break;
          default:
            newCells = getTextCells ? getTextCells(node)
              : [{ ...TEXT_CELL, [NAME_KEY_VALUE]: getText(node) }];
            break;
        }

        newCells.forEach((cell) => {
          if (hasCellTypeChanged) {
            const emptyCell = { ...cell, [NAME_KEY_VALUE]: cellType === CELL_TYPE_CODE ? '' : `<style>${styles}</style>\n\n` };
            cells.push(emptyCell);
          }
          const text = cell[NAME_KEY_VALUE];
          const rootPath = getRootPath(node, nodeIsCode);
          writeCells(notebook, cells, openTagStack, rootPath, text, hasCellTypeChanged);
        });
      }
    }
  }
  writeCells(notebook, cells, openTagStack);

  const nb = TOP_LEVEL ? { cells, ...TOP_LEVEL } : cells;
  const notebookString = JSON.stringify(nb, null, 4);
  if (outputFile) {
    fs.writeFileSync(outputFile, notebookString, 'utf8');
  } else {
    process.stdout.write(`${notebookString}\n`);
  }
};
