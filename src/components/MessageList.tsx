import React from 'react'
import { Message } from '../contexts/ChatContext'
import './MessageList.css'

interface MessageListProps {
  messages: Message[]
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  const formatMessageContent = (content: string) => {
    // Simple markdown-like formatting
    return content
      .split('\n')
      .map((line, index) => {
        if (line.trim().startsWith('•')) {
          return <li key={index} className="list-item">{line.trim().substring(1).trim()}</li>
        }
        return <p key={index} className="message-line">{line}</p>
      })
  }

  if (messages.length === 0) {
    return (
      <div className="empty-messages">
        <div className="empty-content">
          <div className="empty-icon">💬</div>
          <h3>Start a conversation</h3>
          <p>Send a message below to begin chatting with AI assistants.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="message-list">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`message ${message.role}`}
        >
          <div className="message-header">
            <div className="message-role">
              {message.role === 'user' ? '👤 You' : '🤖 AI Assistant'}
            </div>
            <div className="message-time">
              {formatTime(message.timestamp)}
            </div>
          </div>
          
          <div className="message-content">
            {formatMessageContent(message.content)}
          </div>
          
          {message.metadata && (
            <div className="message-metadata">
              {message.metadata.provider && (
                <span className="metadata-item">
                  <span className="metadata-label">Provider:</span>
                  <span className="metadata-value">{message.metadata.provider}</span>
                </span>
              )}
              {message.metadata.model && (
                <span className="metadata-item">
                  <span className="metadata-label">Model:</span>
                  <span className="metadata-value">{message.metadata.model}</span>
                </span>
              )}
              {message.metadata.tokens && (
                <span className="metadata-item">
                  <span className="metadata-label">Tokens:</span>
                  <span className="metadata-value">{message.metadata.tokens}</span>
                </span>
              )}
              {message.metadata.duration && (
                <span className="metadata-item">
                  <span className="metadata-label">Duration:</span>
                  <span className="metadata-value">{message.metadata.duration}ms</span>
                </span>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default MessageList