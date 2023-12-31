# Change Log

All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).
The format is based on [Keep a Changelog](http://keepachangelog.com/).

## Version - 1.2.1 - 2023-06-27

### Added
- Added repository info to `package.json`

### Fixed
- Missing compiled `lib/`

## Version 1.2.0 - 2023-06-27

### Added
- Added notebook configuration option `replaceNode()`

### Removed
- Removed notebook configuration option `getTextCells()`

### Changed
- Migrated source code to Typescript
- Renamed notebook configuration option `html2data()` to `html2cells()`
- Renamed notebook configuration option `data2notebook()` to `cells2notebook()`


## Version 1.1.0 - 2023-06-21

### Fixed
- Properly prepend user-defined styles to *text*-type notebook cells

### Changed
- Start a new cell if cell type has changed and on every code cell
- Allow text cells matching only whitespace characters to be appended

### Removed
- Removed dependencies `typescript`, `typedoc`


## Version 1.0.0 - 2023-06-20
- Initial code base
