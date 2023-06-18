const EXTENSION = 'capnb';

const CELL_TYPE_TEXT = 1;
const CELL_TYPE_CODE = 2;

const DEFAULT_CODE_LANGUAGE = "shell";
const DEFAULT_TEXT_LANGUAGE = "markdown";

const NAME_KEY_VALUE = "value";
const NAME_KEY_TYPE = "kind";

const CODE_CELL = {
    [NAME_KEY_VALUE]: '',
    [NAME_KEY_TYPE]: CELL_TYPE_CODE,
    language: DEFAULT_CODE_LANGUAGE
}

const TEXT_CELL = {
    [NAME_KEY_VALUE]: '',
    [NAME_KEY_TYPE]: CELL_TYPE_TEXT,
    language: DEFAULT_TEXT_LANGUAGE,
}

module.exports = { notebook:
  {
    EXTENSION,
    NAME_KEY_VALUE,
    NAME_KEY_TYPE,
    CELL_TYPE_CODE,
    CELL_TYPE_TEXT,
    CODE_CELL,
    TEXT_CELL
  }
};
