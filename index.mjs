import { createHighlighter } from 'shiki'

const theme = 'github-dark'
const sample = 'A marker: INJECTED and ordinary Markdown.'

// A tiny injection grammar: it should give INJECTED the custom scope below.
const injection = {
  name: 'repro-markdown-injection',
  scopeName: 'source.repro-markdown-injection',
  injectTo: ['text.html.markdown'],
  injectionSelector: 'L:text.html.markdown',
  patterns: [
    {
      match: '\\bINJECTED\\b',
      name: 'keyword.control.repro-injected',
    },
  ],
}

async function run(label, langs) {
  const highlighter = await createHighlighter({ langs, themes: [theme] })

  // In order for the injection grammar to ever work, it needs to be loaded
  // separately, at the same time as Markdown
  await highlighter.loadLanguage('markdown', injection)

  // Note: Loading all languages at once only works for some languages --
  // this works:
  //
  //     const highlighter = await createHighlighter({ langs: ['js', 'markdown', injection], themes: [theme] })
  //
  // But this doesn't:
  //
  //    const highlighter = await createHighlighter({ langs: ['html', 'markdown', injection], themes: [theme] })
  //
  // And even the separation fails when certain other languages are included, as below.

  console.log(`\n--- ${label} ---`)
  console.log('loaded languages:', highlighter.getLoadedLanguages().join(', '))
  console.log(highlighter.codeToHtml(sample, { lang: 'markdown', theme }))

  highlighter.dispose()
}

await run('control: no Svelte/Vue', ['html', 'yaml'])
await run('Svelte present', ['html', 'yaml', 'svelte'])
await run('Vue present', ['html', 'yaml', 'vue'])
