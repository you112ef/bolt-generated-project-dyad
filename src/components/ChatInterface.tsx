import React, { useState, useRef, useEffect } from 'react'
import { useChat } from '../contexts/ChatContext'
import ConversationSidebar from './ConversationSidebar'
import MessageList from './MessageList'
import MessageInput from './MessageInput'
import './ChatInterface.css'

const ChatInterface: React.FC = () => {
  const { activeConversation, isLoading, error } = useChat()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [activeConversation?.messages])

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  if (!activeConversation) {
    return (
      <div className="chat-interface">
        <div className="no-conversation">
          <div className="no-conversation-content">
            <h2>Welcome to Dyad</h2>
            <p>Start a new conversation to begin chatting with AI assistants.</p>
            <button className="new-chat-button">
              <span className="button-icon">➕</span>
              New Chat
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="chat-interface">
      <ConversationSidebar 
        isOpen={sidebarOpen} 
        onToggle={toggleSidebar} 
      />
      
      <div className={`chat-main ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <div className="chat-header">
          <button 
            className="sidebar-toggle"
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
          >
            <span className="toggle-icon">☰</span>
          </button>
          
          <div className="conversation-title">
            <h1>{activeConversation.title}</h1>
            <span className="conversation-meta">
              {activeConversation.messages.length} messages
            </span>
          </div>
          
          <div className="chat-actions">
            <button className="action-button" title="Clear conversation">
              <span className="action-icon">🗑️</span>
            </button>
            <button className="action-button" title="Export chat">
              <span className="action-icon">📤</span>
            </button>
            <button className="action-button" title="Share">
              <span className="action-icon">🔗</span>
            </button>
          </div>
        </div>

        <div className="chat-content">
          <MessageList messages={activeConversation.messages} />
          <div ref={messagesEndRef} />
          
          {isLoading && (
            <div className="typing-indicator">
              <div className="typing-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <span className="typing-text">AI is thinking...</span>
            </div>
          )}
          
          {error && (
            <div className="error-message">
              <span className="error-icon">⚠️</span>
              <span className="error-text">{error}</span>
            </div>
          )}
        </div>

        <div className="chat-input-container">
          <MessageInput />
        </div>
      </div>
    </div>
  )
}

export default ChatInterface