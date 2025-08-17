import { useState } from 'react'
import './App.css'
import ChatInterface from './components/chat/ChatInterface'
import CodeEditor from './components/CodeEditor'
import Settings from './components/settings/Settings'
import { ChatProvider } from './contexts/ChatContext'
import { SettingsProvider } from './contexts/SettingsContext'

function App() {
  const [activeView, setActiveView] = useState<'chat' | 'editor' | 'settings'>('chat')

  return (
    <div className="App">
      <SettingsProvider>
        <ChatProvider>
          <header className="px-4 py-3 border-b">Dyad Web Demo</header>
          <nav className="px-4 py-2 space-x-2 border-b">
            <button onClick={() => setActiveView('chat')}>Chat</button>
            <button onClick={() => setActiveView('editor')}>Editor</button>
            <button onClick={() => setActiveView('settings')}>Settings</button>
          </nav>
          <main className="flex-1 overflow-hidden">
            {activeView === 'chat' && <ChatInterface />}
            {activeView === 'editor' && <CodeEditor />}
            {activeView === 'settings' && <Settings />}
          </main>
        </ChatProvider>
      </SettingsProvider>
    </div>
  )
}

export default App