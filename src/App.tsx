import React, { useState } from 'react'
import TopBar from './components/TopBar'
import ChatInterface from './components/ChatInterface'
import CodeEditor from './components/CodeEditor'
import Settings from './components/Settings'
import { ChatProvider } from './contexts/ChatContext'
import { SettingsProvider } from './contexts/SettingsContext'
import './App.css'

function App() {
  const [activeView, setActiveView] = useState<'chat' | 'editor' | 'settings'>('chat')

  return (
    <SettingsProvider>
      <ChatProvider>
        <div className="app">
          <TopBar activeView={activeView} onViewChange={setActiveView} />
          <main className="main-content">
            {activeView === 'chat' && <ChatInterface />}
            {activeView === 'editor' && <CodeEditor />}
            {activeView === 'settings' && <Settings />}
          </main>
        </div>
      </ChatProvider>
    </SettingsProvider>
  )
}

export default App