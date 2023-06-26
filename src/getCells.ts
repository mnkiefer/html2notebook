import { DomUtils } from 'htmlparser2';
import type { AnyNode, DataNode, Element } from 'domhandler';
import { NotebookCell, NotebookOptions } from './types';


export default function (dom: any, config: NotebookOptions) {
  const nodeIsIgnored = (node: AnyNode) => config?.nodeIsIgnored ? config.nodeIsIgnored(node) : false;
  const nodeIsCode = (node: Element) => config?.nodeIsCode ? config.nodeIsCode(node) : node?.tagName === 'code';
  const getCodeCells = (node: AnyNode) => config?.getCodeCells ? config.getCodeCells(node) : [{ text: getCodeText(<DataNode>node), isCode: true }];

  const root = config?.getRootNode ? config.getRootNode(dom) : dom;
  const nodeStack = root.children;

  const cells: NotebookCell[] = [];
  const openTagStack: AnyNode[] = [];
  const visitedNodes: AnyNode[] = [];

  while (nodeStack.length > 0) {
    let node = nodeStack.pop();

    if (config?.replaceNode) {
      const nodeReplace = config?.replaceNode(node);
      if (node.parent === nodeReplace.parent) {
        DomUtils.replaceElement(node, nodeReplace);
      } else {
        throw new Error("Node and replaced node parents must be the same! Ensure they are the same for the algorithm will not work.")
      }
    }

    if (node === null || node === undefined) break;
    if (visitedNodes.includes(node)) break;
    visitedNodes.push(node);

    if (nodeIsIgnored && !nodeIsIgnored(node)) {
      const isCode: boolean = nodeIsCode(node) ? true : false;

      // Only keep moving down the tree for non-code nodes
      if (nodeHasChildren(<Element>node) && !isCode) {
        (<Element>node)?.children.reverse().forEach((child: AnyNode) => nodeStack.push(child));
      } else {
        const hasCellTypeChanged = !cells.length || cells[cells.length - 1]?.isCode !== isCode;

        let newCells = [];
        switch (isCode) {
          case true:
            newCells = getCodeCells(node);
            break;
          default:
            newCells = [{ text: getText(<DataNode>node), isCode: false }];
            break;
        }
        if (newCells) {
          newCells.forEach((cell: NotebookCell) => {
            // Start new cell if cell type has changed or on every code cell
            if (hasCellTypeChanged || isCode) cells.push({ ...cell, text: '' });
            writeCells(cells, openTagStack, getRootPath(node, nodeIsCode), cell.text, hasCellTypeChanged);
          });
        }
      }
    }
  }
  writeCells(cells, openTagStack);
  return cells;
}


function getRootPath(leaf: any, nodeIsCode: Function) {
  if (nodeIsCode(leaf)) return [];

  const rootPath: any[] = leaf?.type === 'tag' ? [leaf] : [];
  let parent = DomUtils.getParent(leaf);

  while (parent && nodeIsTag(parent)) {
    rootPath.push(parent);
    parent = parent?.parent;
  }
  return rootPath.reverse();
}

function countTags2Close(openTagStack: AnyNode[], rootPath: AnyNode[]) {
  for (let i = 0; i < openTagStack.length; i += 1) {
    if (openTagStack[i] !== rootPath[i]) return openTagStack.length - i;
  }
  return 0;
}

function writeCells(cells: NotebookCell[], openTagStack: AnyNode[], rootPath: AnyNode[] = [], text: string = '', hasCellTypeChanged: boolean = false) {
  const numTagsToClose: number = countTags2Close(openTagStack, rootPath);
  // countTags2Close will always return 0 for the first rootPath and this loop will be skipped
  for (let i = 0; i < numTagsToClose; i += 1) {
    if (cells[cells.length - (hasCellTypeChanged ? 2 : 1)]) {
      cells[cells.length - (hasCellTypeChanged ? 2 : 1)].text += getCloseTag(<Element>openTagStack.pop());
    }
    if (i === numTagsToClose - 1) {
      cells[cells.length - (hasCellTypeChanged ? 2 : 1)].text = cells[cells.length - (hasCellTypeChanged ? 2 : 1)].text.trim();
    }
  }
  // rootPath will be empty for code cells and this loop will be skipped
  for (let i = openTagStack.length; i < rootPath.length; i += 1) {
    cells[cells.length - 1].text += getOpenTag(<Element>rootPath[i]);
    openTagStack.push(rootPath[i]);
  }
  if (text) {
    cells[cells.length - 1].text += text.replace(/\r/g, '');
  }
}

function nodeHasChildren(node: Element): boolean {
  return node?.children?.length > 0
}

function nodeIsTag(node: any) {
  return node?.type === 'tag'
}

function getOpenTag(node: Element): string {
  if (node?.type === 'tag') {
    let attribs = '';
    if (node?.attribs) {
      Object.entries(node?.attribs).forEach(([key, value]) => { attribs += ` ${key}="${value}"`; });
      return `<${node?.tagName}${attribs}>`;
    }
  }
  return '';
}

function getCloseTag(node: Element): string {
  return `</${node?.tagName}>`;
}

function getText(node: DataNode): string {
  return node?.type === 'text' ? node?.data : '';
}

function getCodeText(node: any): string {
  return node?.children[0]?.type === 'text' ? node?.children[0]?.data : '';
}
