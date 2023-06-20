# Advanced example

Let's start with a very similar *HTML* input file as from the [simple example](./examples-simple.md),
but this time, the HTML's code tag class also specifies the dedicated *code* language that should be assigned:

::: code-group
```html [text-with-code.html]
<html>
<div class="n1">
    <div class="n2">TEXT N2
        <div class="n4">
            <div class="n10"></div>
        </div>
        <code class="n5 language-sh">echo "hello"
                <!-- Do *not* get to this leaf node (inside of code) -->
                <div class="n11">TEXT N11</div>
                <div class="n12"></div>
            </code>
        <div class="n6">TEXT N6</div>
    </div>
    <div class="n3">
        <div class="n7"></div>
        <div class="n8">TEXT N8</div>
        <code class="n9 language-cds">entity cat { Name: String; }</code>
    </div>
</div>
</html>
```
:::

### Add your (advanced) notebook configuration

If we were to generate this notebook as configured above, we would not get the specified languages
for the code cells, but both would default to 'shell'. To customize this, we can overwrite the `codeToCells()`
function in our configuration:


::: code-group
```js [build-notebooks.js]
  const { html2notebook } = require('html2notebook');

  const myNotebook = html2notebook({
    type: "cap",
    inputFile: "PATH_TO_PROJECT/text-with-code.html",
    getCodeCells: (node) => {
        const regex = /language-(?<language>[a-z]+)/
        const match = regex.exec(node?.attribs?.class);
        return [{ text: node?.data, type: "code", language: match?.groups.language || '' }]
    }
  });

  console.log(myNotebook)

  ```
  :::

  Running out script, we can now generate the CAP Notebook which has also recognized our languages that had 
  been defined in the tag classes:

```swift
  [
  {
    value: '<html><div class="n1"><div class="n2">TEXT N2\n' +
      '        <div class="n4"><div class="n10"></div></div></div></div></html>',
    language: 'markdown',
    kind: 1
  },
  { value: '', language: 'sh', kind: 2 },
  {
    value: '<html><div class="n1"><div class="n2"><div class="n6">TEXT N6</div></div><div class="n3"><div class="n7"></div><div class="n8">TEXT N8</div></div></div></html>',
    language: 'markdown',
    kind: 1
  },
  { value: '', language: 'cds', kind: 2 },
  {
    value: '<html><div class="n1"><div class="n3"></div></div></html>',
    language: 'markdown',
    kind: 1
  }
]
```