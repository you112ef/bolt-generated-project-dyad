import React, { useState, useEffect, useRef } from 'react'
import './CodeEditor.css'

interface CodeEditorProps {}

const CodeEditor: React.FC<CodeEditorProps> = () => {
  const [code, setCode] = useState(`// Welcome to Dyad Code Editor
// Start coding here...

function fibonacci(n: number): number {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Example usage
console.log(fibonacci(10)); // 55

// You can edit this code and see live preview below
const greeting = "Hello, World!";
console.log(greeting);`)

  const [language, setLanguage] = useState('typescript')
  const [theme, setTheme] = useState('vs-dark')
  const [showPreview, setShowPreview] = useState(true)
  const [previewOutput, setPreviewOutput] = useState('')
  const editorRef = useRef<HTMLDivElement>(null)

  const languages = [
    { value: 'typescript', label: 'TypeScript', icon: '🔷' },
    { value: 'javascript', label: 'JavaScript', icon: '🟡' },
    { value: 'python', label: 'Python', icon: '🐍' },
    { value: 'java', label: 'Java', icon: '☕' },
    { value: 'cpp', label: 'C++', icon: '⚡' },
    { value: 'csharp', label: 'C#', icon: '💎' },
    { value: 'go', label: 'Go', icon: '🐹' },
    { value: 'rust', label: 'Rust', icon: '🦀' },
    { value: 'html', label: 'HTML', icon: '🌐' },
    { value: 'css', label: 'CSS', icon: '🎨' },
    { value: 'json', label: 'JSON', icon: '📄' },
    { value: 'markdown', label: 'Markdown', icon: '📝' }
  ]

  const themes = [
    { value: 'vs-dark', label: 'Dark', icon: '🌙' },
    { value: 'vs-light', label: 'Light', icon: '☀️' },
    { value: 'hc-black', label: 'High Contrast', icon: '⚫' }
  ]

  useEffect(() => {
    // In a real implementation, this would use Monaco Editor
    // For now, we'll simulate the editor with a textarea
    updatePreview()
  }, [code, language])

  const updatePreview = () => {
    try {
      // Simple preview logic - in production this would be more sophisticated
      let output = ''
      
      if (language === 'typescript' || language === 'javascript') {
        // Basic JS/TS execution simulation
        const lines = code.split('\n')
        for (const line of lines) {
          if (line.includes('console.log')) {
            const match = line.match(/console\.log\((.*?)\)/)
            if (match) {
              try {
                // Very basic evaluation - in production use a proper sandbox
                const value = eval(match[1])
                output += `> ${value}\n`
              } catch (e) {
                output += `> Error: ${e}\n`
              }
            }
          }
        }
      } else if (language === 'python') {
        output = '# Python code preview\n# This would execute in a Python environment\n'
        const lines = code.split('\n')
        for (const line of lines) {
          if (line.includes('print(')) {
            const match = line.match(/print\((.*?)\)/)
            if (match) {
              output += `>>> ${match[1]}\n`
            }
          }
        }
      } else if (language === 'html') {
        // HTML preview
        setPreviewOutput(code)
        return
      } else if (language === 'css') {
        output = '/* CSS styles would be applied to the preview */\n'
        output += code
      } else {
        output = `# ${language.toUpperCase()} code\n\n${code}`
      }
      
      setPreviewOutput(output)
    } catch (error) {
      setPreviewOutput(`Error: ${error}`)
    }
  }

  const handleRunCode = () => {
    updatePreview()
  }

  const handleSaveCode = () => {
    const blob = new Blob([code], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `code.${language === 'typescript' ? 'ts' : language === 'javascript' ? 'js' : language}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleClearCode = () => {
    setCode('')
  }

  return (
    <div className="code-editor">
      <div className="editor-header">
        <div className="editor-controls">
          <div className="control-group">
            <label htmlFor="language-select">Language:</label>
            <select
              id="language-select"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="language-select"
            >
              {languages.map(lang => (
                <option key={lang.value} value={lang.value}>
                  {lang.icon} {lang.label}
                </option>
              ))}
            </select>
          </div>
          
          <div className="control-group">
            <label htmlFor="theme-select">Theme:</label>
            <select
              id="theme-select"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="theme-select"
            >
              {themes.map(th => (
                <option key={th.value} value={th.value}>
                  {th.icon} {th.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="editor-actions">
          <button
            className="action-btn run-btn"
            onClick={handleRunCode}
            title="Run Code"
          >
            ▶️ Run
          </button>
          <button
            className="action-btn save-btn"
            onClick={handleSaveCode}
            title="Save Code"
          >
            💾 Save
          </button>
          <button
            className="action-btn clear-btn"
            onClick={handleClearCode}
            title="Clear Code"
          >
            🗑️ Clear
          </button>
          <button
            className={`action-btn preview-btn ${showPreview ? 'active' : ''}`}
            onClick={() => setShowPreview(!showPreview)}
            title="Toggle Preview"
          >
            👁️ Preview
          </button>
        </div>
      </div>

      <div className="editor-content">
        <div className="code-pane">
          <div className="code-header">
            <span className="file-name">main.{language === 'typescript' ? 'ts' : language === 'javascript' ? 'js' : language}</span>
            <span className="line-count">{code.split('\n').length} lines</span>
          </div>
          <textarea
            ref={editorRef as any}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="code-textarea"
            placeholder="Start coding here..."
            spellCheck={false}
          />
        </div>
        
        {showPreview && (
          <div className="preview-pane">
            <div className="preview-header">
              <span className="preview-title">Preview</span>
              <span className="preview-status">Live</span>
            </div>
            
            {language === 'html' ? (
              <div 
                className="html-preview"
                dangerouslySetInnerHTML={{ __html: previewOutput }}
              />
            ) : (
              <pre className="code-output">
                <code>{previewOutput}</code>
              </pre>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default CodeEditor