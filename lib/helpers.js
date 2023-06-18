module.exports = {
  nodeHasChildren: (node) => node?.children?.length > 0,
  nodeIsTag: (node) => node?.type === 'tag',
  getOpenTag: (node) => {
    if (node?.type === 'tag') {
      let attribs = '';
      if (node?.attribs) {
        Object.entries(node?.attribs).forEach(([key, value]) => { attribs += ` ${key}="${value}"`; });
        return `<${node?.tagName}${attribs}>`;
      }
    }
    return '';
  },
  getCloseTag: (node) => `</${node?.tagName}>`,
  getText: (node) => (node?.type === 'text' ? node?.data : ''),
  getCodeText: (node) => (node?.type === 'tag' && node?.children ? node?.children[0]?.data : ''),
};
