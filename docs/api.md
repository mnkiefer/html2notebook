## Functions

<dl>
<dt><a href="#html2data">html2data(userConfig)</a> ⇒</dt>
<dd><p>Generates Notebook data object based on provided
input configuration</p>
</dd>
<dt><a href="#data2notebook">data2notebook(userConfig, notebookData)</a> ⇒</dt>
<dd><p>Generates notebook based on selected notebook type
and notebook data object received</p>
</dd>
<dt><a href="#html2notebook">html2notebook(userConfig)</a></dt>
<dd><p>Generates notebook based on user provided input configuration</p>
</dd>
</dl>

<a name="html2data"></a>

## html2data(userConfig) ⇒
Generates Notebook data object based on provided
input configuration

**Kind**: global function  
**Returns**: NotebookData object  

| Param | Type | Description |
| --- | --- | --- |
| userConfig | <code>NotebookConfig</code> | Input configuration |

<a name="data2notebook"></a>

## data2notebook(userConfig, notebookData) ⇒
Generates notebook based on selected notebook type
and notebook data object received

**Kind**: global function  
**Returns**: notebook object or undefined (when written to file)  

| Param | Type | Description |
| --- | --- | --- |
| userConfig | <code>NotebookConfig</code> | Input configuration |
| notebookData | <code>NotebookData</code> | Notebook data object |

<a name="html2notebook"></a>

## html2notebook(userConfig)
Generates notebook based on user provided input configuration

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| userConfig | <code>NotebookConfig</code> | Input configuration |

