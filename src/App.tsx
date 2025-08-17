import { useState } from 'react'
import './App.css'
import ChatInterface from './components/chat/ChatInterface'
import CodeEditor from './components/CodeEditor'
import Settings from './components/settings/Settings'
import TopBar from './components/TopBar'
import { ChatProvider } from './contexts/ChatContext'
import { SettingsProvider } from './contexts/SettingsContext'

function App() {
  const [activeView, setActiveView] = useState<'chat' | 'editor' | 'settings'>('chat')

  return (
    <div className="App">
      <SettingsProvider>
        <ChatProvider>
          <TopBar onViewChange={setActiveView} />
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