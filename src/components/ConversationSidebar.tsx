import React, { useState } from 'react'
import { useChat } from '../contexts/ChatContext'
import './ConversationSidebar.css'

interface ConversationSidebarProps {
  isOpen: boolean
  onToggle: () => void
}

const ConversationSidebar: React.FC<ConversationSidebarProps> = ({ isOpen, onToggle }) => {
  const { 
    conversations, 
    activeConversation, 
    createConversation, 
    setActiveConversation,
    deleteConversation,
    updateConversationTitle
  } = useChat()
  
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingTitle, setEditingTitle] = useState('')

  const handleNewChat = () => {
    createConversation()
  }

  const handleConversationClick = (id: string) => {
    setActiveConversation(id)
  }

  const handleEditStart = (conversation: any) => {
    setEditingId(conversation.id)
    setEditingTitle(conversation.title)
  }

  const handleEditSave = () => {
    if (editingId && editingTitle.trim()) {
      updateConversationTitle(editingId, editingTitle.trim())
      setEditingId(null)
      setEditingTitle('')
    }
  }

  const handleEditCancel = () => {
    setEditingId(null)
    setEditingTitle('')
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleEditSave()
    } else if (e.key === 'Escape') {
      handleEditCancel()
    }
  }

  const formatDate = (date: Date) => {
    const now = new Date()
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    
    if (diffInHours < 1) {
      return 'Just now'
    } else if (diffInHours < 24) {
      const hours = Math.floor(diffInHours)
      return `${hours}h ago`
    } else {
      return date.toLocaleDateString()
    }
  }

  return (
    <aside className={`conversation-sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        <button className="new-chat-btn" onClick={handleNewChat}>
          <span className="btn-icon">➕</span>
          <span className="btn-text">New Chat</span>
        </button>
      </div>

      <div className="sidebar-content">
        <div className="conversations-list">
          {conversations.length === 0 ? (
            <div className="empty-state">
              <p>No conversations yet</p>
              <p>Start a new chat to begin!</p>
            </div>
          ) : (
            conversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`conversation-item ${
                  activeConversation?.id === conversation.id ? 'active' : ''
                }`}
                onClick={() => handleConversationClick(conversation.id)}
              >
                <div className="conversation-content">
                  {editingId === conversation.id ? (
                    <input
                      type="text"
                      value={editingTitle}
                      onChange={(e) => setEditingTitle(e.target.value)}
                      onKeyDown={handleKeyPress}
                      onBlur={handleEditSave}
                      className="edit-title-input"
                      autoFocus
                    />
                  ) : (
                    <div className="conversation-title">
                      {conversation.title}
                    </div>
                  )}
                  
                  <div className="conversation-meta">
                    <span className="message-count">
                      {conversation.messages.length} messages
                    </span>
                    <span className="conversation-date">
                      {formatDate(conversation.updatedAt)}
                    </span>
                  </div>
                </div>

                <div className="conversation-actions">
                  <button
                    className="action-btn edit-btn"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleEditStart(conversation)
                    }}
                    title="Edit title"
                  >
                    ✏️
                  </button>
                  <button
                    className="action-btn delete-btn"
                    onClick={(e) => {
                      e.stopPropagation()
                      deleteConversation(conversation.id)
                    }}
                    title="Delete conversation"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="sidebar-footer">
        <div className="storage-info">
          <span className="storage-icon">💾</span>
          <span className="storage-text">Local Storage</span>
        </div>
      </div>
    </aside>
  )
}

export default ConversationSidebar