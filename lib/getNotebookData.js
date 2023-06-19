const fs = require('fs');
const { nodeHasChildren, nodeIsTag, getOpenTag, getCloseTag, getText, getCodeText } = require('./helpers');

function getRootPath(leaf, nodeIsCode) {
  if (nodeIsCode(leaf)) return [];
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
    if (openTagStack[i] !== rootPath[i]) return openTagStack.length - i;
  }
  return 0;
}

function writeCells(
  cells,
  openTagStack,
  rootPath = [],
  text = undefined,
  hasCellTypeChanged = false,
) {
  const numTagsToClose = countTags2Close(openTagStack, rootPath);
  // countTags2Close will always return 0 for the first rootPath and this loop will be skipped
  for (let i = 0; i < numTagsToClose; i += 1) {
    if (cells[cells.length - (hasCellTypeChanged ? 2 : 1)]) {
      cells[cells.length - (hasCellTypeChanged ? 2 : 1)].text += getCloseTag(openTagStack.pop());
    }
    if (i === numTagsToClose.length - 1) {
      cells[cells.length - (hasCellTypeChanged ? 2 : 1)].text = cells[cells.length - (hasCellTypeChanged ? 2 : 1)].text.trim();
    }
  }
  // rootPath will be empty for code cells and this loop will be skipped
  for (let i = openTagStack.length; i < rootPath.length; i += 1) {
    cells[cells.length - 1].text += getOpenTag(rootPath[i]);
    openTagStack.push(rootPath[i]);
  }
  if (text && text.replace(/\s/g, '').length) {
    cells[cells.length - 1].text += text;
  }
}

module.exports = ({ config, dom }) => {
  const { nodeIsIgnored, nodeIsCode, getRootNode, getCodeCells, getTextCells } = config;
  const CELL_TYPE_TEXT = "text";
  const CELL_TYPE_CODE = "code";
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
          !cells.length || cells[cells.length - 1]?.type !== cellType
        );

        let newCells = [];
        switch (cellType) {
          case CELL_TYPE_CODE:
            newCells = getCodeCells ? getCodeCells(node) : [{ type: CELL_TYPE_CODE, text: getCodeText(node) }];
            break;
          default:
            newCells = getTextCells ? getTextCells(node) : [{ type: CELL_TYPE_TEXT, text: getText(node) }];
            break;
        }

        newCells.forEach((cell) => {
          if (hasCellTypeChanged) cells.push({ ...cell, text: '' });
          writeCells(cells, openTagStack, getRootPath(node, nodeIsCode), cell.text, hasCellTypeChanged);
        });
      }
    }
  }
  writeCells(cells, openTagStack);
  return cells;
};
