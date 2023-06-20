# Simple example

Let's say we have the following *HTML* file as input:

::: code-group
```html [text-with-code.html]
<html>
<div class="n1">
    <div class="n2">TEXT N2
        <div class="n4">
            <div class="n10"></div>
        </div>
        <code class="n5">CODE N5
                <!-- Do *not* get to this leaf node (inside of code) -->
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
:::

### Use the API

Based on this, we want to generate a notebook. Let's create a script which loads **html2notebook**
so that we can do so. We will call this file `build-notebooks.js` and access the API as follows:

::: code-group
```js [build-notebooks.js]
  const { html2notebook } = require('html2notebook');

```
:::

### Add your notebook configuration

Calling `html2notebook()` requires as input the notebook configuration.

This configuration has two *required* parameters: First, the path to your input *HTML* file, and
second, the Notebook *Type* (`cap`, `jupyter`) you wish to create.

Let's create a `cap`-type Notebook based on our HTML input file `text-with-code.html` and let's simply print
out the generated notebook:

::: code-group
```js [build-notebooks.js]
  const { html2notebook } = require('html2notebook');

  const myNotebook = html2notebook({
    type: "cap",
    inputFile: "PATH_TO_PROJECT/text-with-code.html"
  });

  console.log(myNotebook)

  ```
  :::

  That's it! Now we are ready to run. Execute your script via `node build-notebooks.js` and you will
  see your generated notebook in the output

```swift
[
  {
    value: '<html><div class="n1"><div class="n2">TEXT N2\n' +
      '        <div class="n4"><div class="n10"></div></div></div></div></html>',
    language: 'markdown',
    kind: 1
  },
  { value: 'CODE N5\n                ', language: 'shell', kind: 2 },
  {
    value: '<html><div class="n1"><div class="n2"><div class="n6">TEXT N6</div></div><div class="n3"><div class="n7"></div><div class="n8">TEXT N8</div></div></div></html>',
    language: 'markdown',
    kind: 1
  },
  { value: 'CODE N9', language: 'shell', kind: 2 },
  {
    value: '<html><div class="n1"><div class="n3"></div></div></html>',
    language: 'markdown',
    kind: 1
  }
]
```