import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import type { Components } from 'react-markdown'

interface SyntaxHighlightProps {
  children: string
  language?: string
}

export function SyntaxHighlight({ children, language = 'cpp' }: SyntaxHighlightProps) {
  return (
    <SyntaxHighlighter
      language={language}
      style={vscDarkPlus}
      customStyle={{ margin: 0, borderRadius: '0.5rem', fontSize: '0.875rem' }}
    >
      {children}
    </SyntaxHighlighter>
  )
}

interface MarkdownProps {
  content: string
}

export function Markdown({ content }: MarkdownProps) {
  const components: Components = {
    code({ className, children, ...props }) {
      const match = /language-(\w+)/.exec(className ?? '')
      const isInline = !match
      if (isInline) {
        return <code className={className} {...props}>{children}</code>
      }
      return (
        <SyntaxHighlighter
          language={match[1]}
          style={vscDarkPlus}
          customStyle={{ margin: 0, borderRadius: '0.5rem', fontSize: '0.875rem' }}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      )
    },
  }

  return (
    <div className="markdown-content">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  )
}
