import Markdown from 'markdown-it'
import highlight from 'highlight.js'
import { markdownItTable } from 'markdown-it-table'

const mdOptions = {
  html: true,
  linkify: true,
  typographer: true,
  breaks: true,
  langPrefix: 'language-',
  // 代码高亮
  highlight(str, lang) {
    if (lang && highlight.getLanguage(lang)) {
      try {
        return (
          '<pre class="hljs"><code>' + highlight.highlight(lang, str, true).value + '</code></pre>'
        )
      } catch (__) {}
    }
    return ''
  },
}
const md = new Markdown(mdOptions)
export { md }
