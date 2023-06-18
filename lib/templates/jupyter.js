const EXTENSION = 'ipynb';

const CELL_TYPE_TEXT = "markdown";
const CELL_TYPE_CODE = "code";

const NAME_KEY_VALUE = "source";
const NAME_KEY_TYPE = "cell_type";

const CODE_CELL = {
    "attachments": {},
    [NAME_KEY_TYPE]: CELL_TYPE_CODE,
    metadata: {},
    [NAME_KEY_VALUE]: ''
}

const TEXT_CELL = {
    "attachments": {},
    [NAME_KEY_TYPE]: CELL_TYPE_TEXT,
    metadata: {},
    [NAME_KEY_VALUE]: ''
}

const TOP_LEVEL = {
  "metadata": {
    "language_info": {
     "name": "python"
    },
    "orig_nbformat": 4
   },
   "nbformat": 4,
   "nbformat_minor": 2
  };

module.exports = { notebook:
  {
    TOP_LEVEL,
    EXTENSION,
    NAME_KEY_VALUE,
    NAME_KEY_TYPE,
    CELL_TYPE_CODE,
    CELL_TYPE_TEXT,
    CODE_CELL,
    TEXT_CELL,
    TOP_LEVEL
  }
};
