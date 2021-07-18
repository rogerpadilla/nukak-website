import { ReactMarkdownProps } from 'react-markdown/src/ast-to-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus as syntaxTheme } from 'react-syntax-highlighter/dist/cjs/styles/prism';

export const Code: React.FC<ReactMarkdownProps & { inline?: boolean; className?: string }> = ({
  inline,
  className,
  children,
  ...props
}) => {
  const match = inline ? undefined : /language-(\w+)/.exec(className);
  return match ? (
    <SyntaxHighlighter
      style={syntaxTheme}
      language={match[1]}
      PreTag="div"
      children={String(children).replace(/\n$/, '')}
      {...props}
    />
  ) : (
    <code className={className} {...props}>
      {children}
    </code>
  );
};
