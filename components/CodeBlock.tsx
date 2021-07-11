import React from 'react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/nightOwl';

import styles from './CodeBlock.module.css';

export default function CodeBlock({ children, className }: any) {
  const language = className.replace(/language-/, '');

  return (
    <Highlight {...defaultProps} theme={theme} code={children.trim()} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={[className, styles.pre].join(' ')} style={style}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })} className={styles.line}>
              <span className={styles.lineNo}>{i + 1}</span>
              <span className={styles.lineContent}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </span>
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}
