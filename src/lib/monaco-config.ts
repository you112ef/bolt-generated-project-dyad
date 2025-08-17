import * as monaco from 'monaco-editor'

// Editor options
export const editorOptions: monaco.editor.IStandaloneEditorConstructionOptions = {
  theme: 'dyad-dark',
  fontSize: 14,
  fontFamily: 'JetBrains Mono, Fira Code, monospace',
  lineHeight: 1.6,
  minimap: { enabled: true },
  scrollBeyondLastLine: false,
  automaticLayout: true,
  wordWrap: 'on',
  folding: true,
  lineNumbers: 'on',
  glyphMargin: true,
  foldingStrategy: 'indentation',
  showFoldingControls: 'always',
  selectOnLineNumbers: true,
  roundedSelection: false,
  readOnly: false,
  cursorStyle: 'line',
  automaticLayout: true,
  contextmenu: true,
  mouseWheelZoom: true,
  quickSuggestions: {
    other: true,
    comments: true,
    strings: true
  },
  suggestOnTriggerCharacters: true,
  acceptSuggestionOnCommitCharacter: true,
  acceptSuggestionOnEnter: 'on',
  tabCompletion: 'on',
  wordBasedSuggestions: true,
  parameterHints: {
    enabled: true,
    cycle: true
  },
  hover: {
    enabled: true,
    delay: 300
  },
  links: true,
  colorDecorators: true,
  lightbulb: {
    enabled: true
  },
  codeActionsOnSave: {
    'source.fixAll': true,
    'source.organizeImports': true
  },
  formatOnPaste: true,
  formatOnType: true,
  suggest: {
    insertMode: 'replace',
    showKeywords: true,
    showSnippets: true,
    showClasses: true,
    showFunctions: true,
    showVariables: true,
    showModules: true,
    showProperties: true,
    showEvents: true,
    showOperators: true,
    showUnits: true,
    showValues: true,
    showConstants: true,
    showEnums: true,
    showEnumMembers: true,
    showColors: true,
    showFiles: true,
    showReferences: true,
    showFolders: true,
    showTypeParameters: true,
    showWords: true,
    showUsers: true,
    showIssues: true
  }
}

// Diff editor options
export const diffEditorOptions: monaco.editor.IDiffEditorConstructionOptions = {
  theme: 'dyad-dark',
  fontSize: 14,
  fontFamily: 'JetBrains Mono, Fira Code, monospace',
  lineHeight: 1.6,
  renderSideBySide: true,
  enableSplitViewResizing: true,
  renderOverviewRuler: true,
  ignoreTrimWhitespace: false,
  renderIndicators: true,
  originalEditor: {
    readOnly: true
  },
  modifiedEditor: {
    readOnly: false
  }
}

// Model options
export const modelOptions: monaco.editor.ITextModelUpdateOptions = {
  tabSize: 2,
  insertSpaces: true,
  detectIndentation: true,
  trimAutoWhitespace: true,
  largeFileOptimizations: true,
  bracketPairColorization: {
    enabled: true
  },
  guides: {
    bracketPairs: true,
    indentation: true,
    highlightActiveIndentation: true
  }
}

// Language-specific configurations
export const languageConfigs: Record<string, monaco.languages.LanguageConfiguration> = {
  typescript: {
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
      { open: "'", close: "'", notIn: ['string', 'comment'] },
      { open: '"', close: '"', notIn: ['string'] },
      { open: '`', close: '`', notIn: ['string', 'comment'] }
    ],
    surroundingPairs: [
      { open: '{', close: '}' },
      { open: '[', close: ']' },
      { open: '(', close: ')' },
      { open: "'", close: "'" },
      { open: '"', close: '"' },
      { open: '`', close: '`' }
    ]
  },
  javascript: {
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
      { open: "'", close: "'", notIn: ['string', 'comment'] },
      { open: '"', close: '"', notIn: ['string'] },
      { open: '`', close: '`', notIn: ['string', 'comment'] }
    ],
    surroundingPairs: [
      { open: '{', close: '}' },
      { open: '[', close: ']' },
      { open: '(', close: ')' },
      { open: "'", close: "'" },
      { open: '"', close: '"' },
      { open: '`', close: '`' }
    ]
  }
}

// Custom themes
export const customThemes = {
  'dyad-light': {
    base: 'vs' as const,
    inherit: true,
    rules: [
      { token: 'comment', foreground: '6A737D', fontStyle: 'italic' },
      { token: 'keyword', foreground: 'D73A49' },
      { token: 'string', foreground: '032F62' },
      { token: 'number', foreground: '005CC5' },
      { token: 'type', foreground: '445588' },
      { token: 'function', foreground: '6F42C1' },
      { token: 'variable', foreground: '24292E' },
      { token: 'constant', foreground: 'E36209' },
      { token: 'operator', foreground: 'D73A49' },
      { token: 'delimiter', foreground: '24292E' }
    ],
    colors: {
      'editor.background': '#FFFFFF',
      'editor.foreground': '#24292E',
      'editor.lineHighlightBackground': '#F6F8FA',
      'editor.selectionBackground': '#C8E1FF',
      'editor.inactiveSelectionBackground': '#E1E4E8',
      'editor.findMatchBackground': '#FFEB3B',
      'editor.findMatchHighlightBackground': '#FFEB3B80',
      'editorCursor.foreground': '#24292E',
      'editorWhitespace.foreground': '#E1E4E8',
      'editorIndentGuide.background': '#E1E4E8',
      'editorIndentGuide.activeBackground': '#C8E1FF',
      'editorLineNumber.foreground': '#6A737D',
      'editorLineNumber.activeForeground': '#24292E',
      'editorLineNumber.dimmedForeground': '#E1E4E8',
      'editorRuler.foreground': '#E1E4E8',
      'editorCodeLens.foreground': '#6A737D',
      'editorBracketMatch.background': '#E1E4E8',
      'editorBracketMatch.border': '#E1E4E8',
      'editorOverviewRuler.border': '#E1E4E8',
      'editorOverviewRuler.findMatchForeground': '#FFEB3B',
      'editorOverviewRuler.errorForeground': '#D73A49',
      'editorOverviewRuler.warningForeground': '#E36209',
      'editorOverviewRuler.infoForeground': '#0366D6'
    }
  },
  'dyad-dark': {
    base: 'vs-dark' as const,
    inherit: true,
    rules: [
      { token: 'comment', foreground: '6A737D', fontStyle: 'italic' },
      { token: 'keyword', foreground: 'FF7B72' },
      { token: 'string', foreground: 'A5D6FF' },
      { token: 'number', foreground: '79C0FF' },
      { token: 'type', foreground: 'FFA657' },
      { token: 'function', foreground: 'D2A8FF' },
      { token: 'variable', foreground: 'FFA8C4' },
      { token: 'constant', foreground: '79C0FF' },
      { token: 'operator', foreground: 'FF7B72' },
      { token: 'delimiter', foreground: 'C9D1D9' }
    ],
    colors: {
      'editor.background': '#0D1117',
      'editor.foreground': '#C9D1D9',
      'editor.lineHighlightBackground': '#161B22',
      'editor.selectionBackground': '#264F78',
      'editor.inactiveSelectionBackground': '#21262D',
      'editor.findMatchBackground': '#FFD33D',
      'editor.findMatchHighlightBackground': '#FFD33D40',
      'editorCursor.foreground': '#C9D1D9',
      'editorWhitespace.foreground': '#21262D',
      'editorIndentGuide.background': '#21262D',
      'editorIndentGuide.activeBackground': '#264F78',
      'editorLineNumber.foreground': '#8B949E',
      'editorLineNumber.activeForeground': '#C9D1D9',
      'editorLineNumber.dimmedForeground': '#21262D',
      'editorRuler.foreground': '#21262D',
      'editorCodeLens.foreground': '#8B949E',
      'editorBracketMatch.background': '#21262D',
      'editorBracketMatch.border': '#21262D',
      'editorOverviewRuler.border': '#21262D',
      'editorOverviewRuler.findMatchForeground': '#FFD33D',
      'editorOverviewRuler.errorForeground': '#FF7B72',
      'editorOverviewRuler.warningForeground': '#FFA657',
      'editorOverviewRuler.infoForeground': '#79C0FF'
    }
  }
}

// Initialize Monaco with custom themes and configurations
export function initializeMonaco() {
  // Define custom themes
  Object.entries(customThemes).forEach(([name, theme]) => {
    monaco.editor.defineTheme(name, theme)
  })

  // Set language configurations
  Object.entries(languageConfigs).forEach(([language, config]) => {
    monaco.languages.setLanguageConfiguration(language, config)
  })

  // Set default theme
  monaco.editor.setTheme('dyad-dark')
}