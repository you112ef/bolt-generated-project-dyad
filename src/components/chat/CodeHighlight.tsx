import { useState, useEffect, useRef, memo, type ReactNode } from "react";
import { isInlineCode, useShikiHighlighter } from "react-shiki";
import github from "@shikijs/themes/github-light-default";
import githubDark from "@shikijs/themes/github-dark-default";
import type { Element as HastElement } from "hast";
import { Copy, Check } from "lucide-react";

interface CodeHighlightProps {
  className?: string | undefined;
  children?: ReactNode | undefined;
  node?: HastElement | undefined;
}

export const CodeHighlight = memo(
  ({ className, children, node, ...props }: CodeHighlightProps) => {
    const code = String(children).trim();
    const language = className?.match(/language-(\w+)/)?.[1];
    const isInline = node ? isInlineCode(node) : false;
    
    const [copied, setCopied] = useState(false);
    const handleCopy = () => {
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };

    const isDarkMode = document.documentElement.classList.contains('dark');

    const highlightedCodeCache = useRef<ReactNode | null>(null);

    const highlightedCode = useShikiHighlighter(
      code,
      language,
      isDarkMode ? githubDark : github,
      { delay: 150 },
    );

    useEffect(() => {
      if (highlightedCode) {
        highlightedCodeCache.current = highlightedCode;
      }
    }, [highlightedCode]);

    const displayCode = highlightedCodeCache.current || highlightedCode || code;

    if (isInline) {
      return (
        <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
          {children}
        </code>
      );
    }

    return (
      <div className="relative group">
        <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={handleCopy} className="p-2 rounded-md bg-background/80 hover:bg-background border shadow-sm" title="Copy code">
            {copied ? (<Check className="h-4 w-4 text-green-600" />) : (<Copy className="h-4 w-4" />)}
          </button>
        </div>
        <pre className={`relative overflow-x-auto rounded-lg border bg-muted p-4 ${className || ""}`} {...props}>
          <code className="text-sm leading-relaxed">
            {displayCode}
          </code>
        </pre>
      </div>
    );
  }
);

CodeHighlight.displayName = "CodeHighlight";