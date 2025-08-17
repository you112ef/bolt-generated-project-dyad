import { useState, useRef, useEffect } from 'react'
import Editor from '@monaco-editor/react'
import { editorOptions, diffEditorOptions, initializeMonaco } from '../lib/monaco-config'

const CodeEditor: React.FC = () => {
  const [code, setCode] = useState('// Start coding here...\nconsole.log("Hello, World!");')
  const [language, setLanguage] = useState('javascript')
  const [theme, setTheme] = useState('dyad-dark')
  const [output, setOutput] = useState('')
  const [isRunning, setIsRunning] = useState(false)
  const editorRef = useRef<any>(null)

  const languages = [
    { value: 'javascript', label: 'JavaScript', icon: '🟨' },
    { value: 'typescript', label: 'TypeScript', icon: '🔵' },
    { value: 'python', label: 'Python', icon: '🐍' },
    { value: 'java', label: 'Java', icon: '☕' },
    { value: 'cpp', label: 'C++', icon: '🔷' },
    { value: 'csharp', label: 'C#', icon: '💜' },
    { value: 'go', label: 'Go', icon: '🔵' },
    { value: 'rust', label: 'Rust', icon: '🦀' },
    { value: 'php', label: 'PHP', icon: '🐘' },
    { value: 'ruby', label: 'Ruby', icon: '💎' },
    { value: 'swift', label: 'Swift', icon: '🍎' },
    { value: 'kotlin', label: 'Kotlin', icon: '🟠' },
    { value: 'scala', label: 'Scala', icon: '🔴' },
    { value: 'html', label: 'HTML', icon: '🌐' },
    { value: 'css', label: 'CSS', icon: '🎨' },
    { value: 'sql', label: 'SQL', icon: '🗄️' },
    { value: 'json', label: 'JSON', icon: '📄' },
    { value: 'yaml', label: 'YAML', icon: '📋' },
    { value: 'markdown', label: 'Markdown', icon: '📝' },
    { value: 'xml', label: 'XML', icon: '📊' }
  ]

  const themes = [
    { value: 'dyad-dark', label: 'Dyad Dark' },
    { value: 'dyad-light', label: 'Dyad Light' },
    { value: 'vs-dark', label: 'VS Dark' },
    { value: 'vs-light', label: 'VS Light' },
    { value: 'hc-black', label: 'High Contrast' }
  ]

  useEffect(() => {
    initializeMonaco()
  }, [])

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor
  }

  const runCode = async () => {
    if (!code.trim()) return

    setIsRunning(true)
    setOutput('Running code...\n')

    try {
      // This is a simple code execution simulation
      // In a real app, you'd send this to a backend service
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      let result = ''
      
      if (language === 'javascript' || language === 'typescript') {
        try {
          // Very basic JavaScript evaluation (for demo purposes only)
          if (code.includes('console.log')) {
            result = 'Code executed successfully!\nOutput would appear in browser console.'
          } else {
            result = 'Code executed successfully!'
          }
        } catch (error) {
          result = `Error: ${error}`
        }
      } else if (language === 'python') {
        result = 'Python code would be executed on the server'
      } else if (language === 'sql') {
        result = 'SQL query would be executed against the database'
      } else {
        result = `${language} code would be processed`
      }
      
      setOutput(result)
    } catch (error) {
      setOutput(`Error: ${error}`)
    } finally {
      setIsRunning(false)
    }
  }

  const saveCode = () => {
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

  const clearCode = () => {
    setCode('')
    setOutput('')
  }

  const loadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        setCode(content)
      }
      reader.readAsText(file)
    }
  }

  return (
    <div className="h-full flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Toolbar */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Language:
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {languages.map((lang) => (
                  <option key={lang.value} value={lang.value}>
                    {lang.icon} {lang.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Theme Selector */}
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Theme:
              </label>
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {themes.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <input
              type="file"
              accept=".js,.ts,.py,.java,.cpp,.cs,.go,.rs,.php,.rb,.swift,.kt,.scala,.html,.css,.sql,.json,.yaml,.md,.xml"
              onChange={loadFile}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="px-3 py-1 bg-gray-600 text-white rounded-md hover:bg-gray-700 cursor-pointer text-sm transition-colors"
            >
              📁 Load File
            </label>
            
            <button
              onClick={saveCode}
              className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm transition-colors"
            >
              💾 Save
            </button>
            
            <button
              onClick={clearCode}
              className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm transition-colors"
            >
              🗑️ Clear
            </button>
            
            <button
              onClick={runCode}
              disabled={isRunning || !code.trim()}
              className="px-4 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm transition-colors"
            >
              {isRunning ? '⏳ Running...' : '▶️ Run'}
            </button>
          </div>
        </div>
      </div>

      {/* Editor and Output */}
      <div className="flex-1 flex">
        {/* Code Editor */}
        <div className="flex-1">
          <Editor
            height="100%"
            defaultLanguage={language}
            language={language}
            theme={theme}
            value={code}
            onChange={(value) => setCode(value || '')}
            onMount={handleEditorDidMount}
            options={editorOptions}
            className="border-r border-gray-200 dark:border-gray-700"
          />
        </div>

        {/* Output Panel */}
        <div className="w-1/3 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Output</h3>
          </div>
          <div className="p-4">
            <pre className="text-sm text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 p-3 rounded-md overflow-auto max-h-96">
              {output || 'Code output will appear here...'}
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CodeEditor