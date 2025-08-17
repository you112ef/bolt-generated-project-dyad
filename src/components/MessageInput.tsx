import React, { useState, useRef, useEffect } from 'react'
import { useChat } from '../contexts/ChatContext'
import './MessageInput.css'

const MessageInput: React.FC = () => {
  const { sendMessage, isLoading } = useChat()
  const [inputValue, setInputValue] = useState('')
  const [isComposing, setIsComposing] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [inputValue])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim() || isLoading) return

    const message = inputValue.trim()
    setInputValue('')
    
    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }

    await sendMessage(message)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && !isComposing) {
      e.preventDefault()
      handleSubmit(e as any)
    }
  }

  const handleCompositionStart = () => {
    setIsComposing(true)
  }

  const handleCompositionEnd = () => {
    setIsComposing(false)
  }

  return (
    <form className="message-input-form" onSubmit={handleSubmit}>
      <div className="input-container">
        <textarea
          ref={textareaRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onCompositionStart={handleCompositionStart}
          onCompositionEnd={handleCompositionEnd}
          placeholder="Type your message here... (Shift+Enter for new line)"
          className="message-textarea"
          rows={1}
          disabled={isLoading}
        />
        
        <button
          type="submit"
          className="send-button"
          disabled={!inputValue.trim() || isLoading}
        >
          {isLoading ? (
            <span className="loading-spinner"></span>
          ) : (
            <span className="send-icon">📤</span>
          )}
        </button>
      </div>
      
      <div className="input-footer">
        <div className="input-tips">
          <span className="tip">Press Enter to send</span>
          <span className="tip">Shift+Enter for new line</span>
        </div>
        
        <div className="input-actions">
          <button
            type="button"
            className="action-btn"
            title="Attach file"
            disabled={isLoading}
          >
            📎
          </button>
          <button
            type="button"
            className="action-btn"
            title="Record voice"
            disabled={isLoading}
          >
            🎤
          </button>
          <button
            type="button"
            className="action-btn"
            title="Use template"
            disabled={isLoading}
          >
            📋
          </button>
        </div>
      </div>
    </form>
  )
}

export default MessageInput