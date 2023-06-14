export function nodeHasChildren(node) {
    return node?.children?.length > 0;
}

export function nodeIsTag(node) {
    return node?.type === "tag";
}

export function getOpenTag(node) {
    if (node?.type === 'tag') {
        let attribs = '';
        if (node?.attribs) {
            for (let [key, value] of Object.entries(node?.attribs)) {
                attribs += ` ${key}="${value}"`;
            }
            return `<${node?.tagName}${attribs}>`
        }
    }
}

export function getCloseTag(node) {
    return `</${node?.tagName}>`
}

export function getText(node) {
    return node?.type === "text" ? node?.data : '';
}

export function getCodeText(node) {
    return node?.type === "tag" && node?.children ? node?.children[0]?.data : '';
}