import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus as syntaxTheme } from 'react-syntax-highlighter/dist/cjs/styles/prism';

export const Code: React.FC<{ inline?: boolean; className?: string, children: any }> = ({
  inline,
  className,
  children,
  ...props
}) => {
  const match = inline ? undefined : /language-(\w+)/.exec(className);
  return match ? (
    <SyntaxHighlighter style={syntaxTheme} language={match[1]} PreTag="div" {...props}>
      {String(children).replace(/\n$/, '')}
    </SyntaxHighlighter>
  ) : (
    <code className={className} {...props}>
      {children}
    </code>
  );
};
