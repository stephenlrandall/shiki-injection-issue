# Shiki Markdown injection reproduction

Minimal reproduction for an injection grammar targeting `text.html.markdown` behaving differently when the Svelte or Vue grammar is registered in the same Shiki highlighter. There's also a note in `index.mjs` about other issues with loading injection grammars simultaneously with other languages.

## Run

Requires Node.js and npm:

```sh
npm install
npm run repro
```

The script prints the highlighted HTML for three cases:

1. Control: `html` and `yaml` loaded initially.
2. Svelte loaded initially.
3. Vue loaded initially.

The test injection grammar assigns `keyword.control.repro-injected` to the word `INJECTED`. Compare the rendered HTML across the cases. The control is expected to show the injected scope; the reported bug is that registering Svelte or Vue causes the injection not to take effect.

Tested target version: Shiki `4.5.0`.
