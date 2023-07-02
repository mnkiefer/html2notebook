# html2notebook

**html2notebook** is a conversion tool that let's you translate _HTML_ to [notebooks](#supported-notebook-formats).

|                               Notebook type                                | File extension | Supported |
| :------------------------------------------------------------------------: | :------------: | :-------: |
|   [CAP Notebook](https://cap.cloud.sap/docs/tools/#cap-vscode-notebook)    |     .capnb     |     ✓     |
| [Jupyter Notebook](https://docs.jupyter.org/en/latest/#what-is-a-notebook) |     .ipynb     |     ✓     |

## Installation

```sh
npm install html2notebook
```

## Usage

Let's consider we have the following file _test.html_ as input:

```html
<html>
  <div class="n1">
    <div class="n2">TEXT N2
      <div class="n4">
        <div class="n10"></div>
      </div>
      <code class="n5">CODE N5
        <div class="n11">TEXT N11</div>
        <div class="n12"></div>
      </code>
      <div class="n6">TEXT N6</div>
    </div>
    <div class="n3">
      <div class="n7"></div>
      <div class="n8">TEXT N8</div>
      <code class="n9">CODE N9</code>
    </div>
  </div>
</html>
```

To generate a type _Jupyter_ notebook:

```js
const { html2notebook } = require("html2notebook");

const html = fs.readFileSync("test.html", "utf8");
const nb = html2notebook(html);

console.log(nb);
```

This produces the following output:

```swift
{
  "metadata": {
    "language_info": {
      "name": "python"
    },
    "orig_nbformat": 4
  },
  "nbformat": 4,
  "nbformat_minor": 2,
  "cells": [
    {
      "attachments": {},
      "metadata": {},
      "cell_type": "markdown",
      "source": [
        "<html>",
        "  <div class=\"n1\">",
        "    <div class=\"n2\">",
        "      TEXT N2",
        "      <div class=\"n4\">",
        "        <div class=\"n10\"></div>",
        "      </div>",
        "      </div></div></html>"
      ]
    },
    {
      "metadata": {},
      "execution_count": null,
      "outputs": [],
      "cell_type": "code",
      "source": [
        "CODE N5",
        "        "
      ]
    },
    {
      "attachments": {},
      "metadata": {},
      "cell_type": "markdown",
      "source": [
        "<html><div class=\"n1\"><div class=\"n2\">",
        "      <div class=\"n6\">TEXT N6</div>",
        "    </div>",
        "    <div class=\"n3\">",
        "      <div class=\"n7\"></div>",
        "      <div class=\"n8\">TEXT N8</div>",
        "      </div></div></html>"
      ]
    },
    {
      "metadata": {},
      "execution_count": null,
      "outputs": [],
      "cell_type": "code",
      "source": [
        "CODE N9"
      ]
    },
    {
      "attachments": {},
      "metadata": {},
      "cell_type": "markdown",
      "source": [
        "<html><div class=\"n1\"><div class=\"n3\">",
        "    </div>",
        "  </div>",
        "</html>"
      ]
    }
  ]
}
```
