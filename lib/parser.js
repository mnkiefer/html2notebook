
import * as fs from "fs";
import * as path from "path";
import { parseDocument } from "htmlparser2";

export const parser = async (config) => {
    config = await sanitizeConfig(config);

    const htmlInput = fs.readFileSync(config.inputFile, 'utf8')
    const dom = parseDocument(htmlInput);

    return { config, dom };
}

async function sanitizeConfig(config) {
    const notebookType = config.type || 'cap';

    let { notebook } = await import(`./notebooks/${notebookType}.js`);

    const inputFile = config.inputFile ? config.inputFile : ''
    const outputFile = config.outputFile ? config.outputFile : ''
    const styles = config.styles || ''

    const nodeIsIgnored = config.nodeIsIgnored ? config.nodeIsIgnored : (node) => false;
    const nodeIsCode = config.nodeIsCode ? config.nodeIsCode : (node) => (node?.type === "tag" && node?.name === "code");

    const getRootNode = config.getRootNode ? config.getRootNode : undefined;
    const getCodeCells = config.getCodeCells ? config.getCodeCells : undefined;
    const getTextCells = config.getTextCells ? config.getTextCells : undefined;

    return {
        extension: notebook.EXTENSION,
        inputFile,
        outputFile,
        styles,
        nodeIsIgnored,
        nodeIsCode,
        getRootNode,
        getCodeCells,
        getTextCells,
        notebook
    }
}
