import { editor } from 'monaco-editor'

// Monaco Editor configuration based on dyad project
export const monacoConfig = {
  // Editor options
  editor: {
    fontSize: 14,
    fontFamily: 'JetBrains Mono, Fira Code, Consolas, monospace',
    lineHeight: 20,
    letterSpacing: 0.5,
    wordWrap: 'on',
    minimap: {
      enabled: false
    },
    scrollBeyondLastLine: false,
    automaticLayout: true,
    theme: 'vs-dark',
    renderWhitespace: 'selection',
    tabSize: 2,
    insertSpaces: true,
    detectIndentation: true,
    trimAutoWhitespace: true,
    largeFileOptimizations: true,
    suggest: {
      showKeywords: true,
      showSnippets: true,
      showClasses: true,
      showFunctions: true,
      showVariables: true,
      showConstants: true,
      showEnums: true,
      showEnumsMembers: true,
      showColors: true,
      showFiles: true,
      showReferences: true,
      showFolders: true,
      showTypeParameters: true,
      showWords: true,
      showUsers: true,
      showIssues: true,
      showColors: true,
      showFiles: true,
      showReferences: true,
      showFolders: true,
      showTypeParameters: true,
      showWords: true,
      showUsers: true,
      showIssues: true
    },
    quickSuggestions: {
      other: true,
      comments: true,
      strings: true
    },
    parameterHints: {
      enabled: true
    },
    autoIndent: 'full',
    formatOnPaste: true,
    formatOnType: true,
    dragAndDrop: true,
    copyWithSyntaxHighlighting: true,
    emptySelectionClipboard: false,
    folding: true,
    foldingStrategy: 'auto',
    showFoldingControls: 'always',
    unfoldOnClickAfterEnd: false,
    links: true,
    colorDecorators: true,
    lightbulb: {
      enabled: true
    },
    codeActionsOnSave: {
      'source.fixAll': true,
      'source.organizeImports': true
    }
  },
  
  // Diff editor options
  diffEditor: {
    renderSideBySide: true,
    ignoreTrimWhitespace: false,
    renderIndicators: true,
    originalEditable: false,
    modifiedEditable: true
  },
  
  // Model options
  model: {
    tabSize: 2,
    insertSpaces: true,
    detectIndentation: true,
    trimAutoWhitespace: true,
    largeFileOptimizations: true
  }
}

// Custom themes based on dyad
export const customThemes = {
  'dyad-light': {
    base: 'vs',
    inherit: false,
    rules: [
      { token: '', foreground: '000000', background: 'fffffe' },
      { token: 'invalid', foreground: 'cd3131' },
      { token: 'emphasis', fontStyle: 'italic' },
      { token: 'strong', fontStyle: 'bold' },
      { token: 'variable', foreground: '001188' },
      { token: 'variable.predefined', foreground: '4864AA' },
      { token: 'constant', foreground: 'dd0000' },
      { token: 'comment', foreground: '008000' },
      { token: 'string', foreground: 'a31515' },
      { token: 'string.escape', foreground: 'ff0000' },
      { token: 'keyword', foreground: '0000ff' },
      { token: 'storage', foreground: '0000ff' },
      { token: 'entity.name.function', foreground: '795e26' },
      { token: 'entity.name.type', foreground: '267f99' },
      { token: 'entity.other.attribute-name', foreground: 'ff0000' },
      { token: 'support.function', foreground: '267f99' },
      { token: 'support.constant', foreground: '0000ff' },
      { token: 'support.type', foreground: '267f99' },
      { token: 'support.class', foreground: '267f99' },
      { token: 'support.other', foreground: '267f99' },
      { token: 'invalid.deprecated', foreground: 'cd3131' }
    ],
    colors: {
      'editor.background': '#ffffff',
      'editor.foreground': '#000000',
      'editor.lineHighlightBackground': '#f0f0f0',
      'editor.selectionBackground': '#add6ff',
      'editor.inactiveSelectionBackground': '#e5ebf1'
    }
  },
  
  'dyad-dark': {
    base: 'vs-dark',
    inherit: false,
    rules: [
      { token: '', foreground: 'd4d4d4', background: '1e1e1e' },
      { token: 'invalid', foreground: 'f44747' },
      { token: 'emphasis', fontStyle: 'italic' },
      { token: 'strong', fontStyle: 'bold' },
      { token: 'variable', foreground: '9cdcfe' },
      { token: 'variable.predefined', foreground: '4864AA' },
      { token: 'constant', foreground: 'b5cea8' },
      { token: 'comment', foreground: '6a9955' },
      { token: 'string', foreground: 'ce9178' },
      { token: 'string.escape', foreground: 'd7ba7d' },
      { token: 'keyword', foreground: '569cd6' },
      { token: 'storage', foreground: '569cd6' },
      { token: 'entity.name.function', foreground: 'dcdcaa' },
      { token: 'entity.name.type', foreground: '4ec9b0' },
      { token: 'entity.other.attribute-name', foreground: '9cdcfe' },
      { token: 'support.function', foreground: 'dcdcaa' },
      { token: 'support.constant', foreground: '4fc1ff' },
      { token: 'support.type', foreground: '4ec9b0' },
      { token: 'support.class', foreground: '4ec9b0' },
      { token: 'support.other', foreground: '4ec9b0' },
      { token: 'invalid.deprecated', foreground: 'f44747' }
    ],
    colors: {
      'editor.background': '#1e1e1e',
      'editor.foreground': '#d4d4d4',
      'editor.lineHighlightBackground': '#2a2d2e',
      'editor.selectionBackground': '#264f78',
      'editor.inactiveSelectionBackground': '#3a3d41'
    }
  }
}

// Language configurations
export const languageConfigs = {
  typescript: {
    wordPattern: /(-?\d*\.\d\w*)|([^\`\~\!\@\#\%\^\&\*\(\)\-\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\?\s]+)/g,
    comments: {
      lineComment: '//',
      blockComment: ['/*', '*/']
    },
    brackets: [
      ['{', '}'],
      ['[', ']'],
      ['(', ')']
    ],
    autoClosingPairs: [
      { open: '{', close: '}' },
      { open: '[', close: ']' },
      { open: '(', close: ')' },
      { open: '"', close: '"', notIn: ['string'] },
      { open: "'", close: "'", notIn: ['string'] },
      { open: '`', close: '`', notIn: ['string'] }
    ],
    surroundingPairs: [
      { open: '{', close: '}' },
      { open: '[', close: ']' },
      { open: '(', close: ')' },
      { open: '"', close: '"' },
      { open: "'", close: "'" },
      { open: '`', close: '`' }
    ]
  },
  
  javascript: {
    wordPattern: /(-?\d*\.\d\w*)|([^\`\~\!\@\#\%\^\&\*\(\)\-\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\?\s]+)/g,
    comments: {
      lineComment: '//',
      blockComment: ['/*', '*/']
    },
    brackets: [
      ['{', '}'],
      ['[', ']'],
      ['(', ')']
    ],
    autoClosingPairs: [
      { open: '{', close: '}' },
      { open: '[', close: ']' },
      { open: '(', close: ')' },
      { open: '"', close: '"', notIn: ['string'] },
      { open: "'", close: "'", notIn: ['string'] },
      { open: '`', close: '`', notIn: ['string'] }
    ],
    surroundingPairs: [
      { open: '{', close: '}' },
      { open: '[', close: ']' },
      { open: '(', close: ')' },
      { open: '"', close: '"' },
      { open: "'", close: "'" },
      { open: '`', close: '`' }
    ]
  },
  
  python: {
    wordPattern: /(-?\d*\.\d\w*)|([^\`\~\!\@\#\%\^\&\*\(\)\-\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\?\s]+)/g,
    comments: {
      lineComment: '#',
      blockComment: ['"""', '"""']
    },
    brackets: [
      ['{', '}'],
      ['[', ']'],
      ['(', ')']
    ],
    autoClosingPairs: [
      { open: '{', close: '}' },
      { open: '[', close: ']' },
      { open: '(', close: ')' },
      { open: '"', close: '"', notIn: ['string'] },
      { open: "'", close: "'", notIn: ['string'] }
    ],
    surroundingPairs: [
      { open: '{', close: '}' },
      { open: '[', close: ']' },
      { open: '(', close: ')' },
      { open: '"', close: '"' },
      { open: "'", close: "'" }
    ]
  }
}

// Initialize Monaco with custom configuration
export const initializeMonaco = () => {
  // Register custom themes
  Object.entries(customThemes).forEach(([name, theme]) => {
    editor.defineTheme(name, theme)
  })
  
  // Register language configurations
  Object.entries(languageConfigs).forEach(([language, config]) => {
    editor.setModelLanguageConfiguration(language, config)
  })
  
  // Set default theme
  editor.setTheme('dyad-dark')
}

export default monacoConfig