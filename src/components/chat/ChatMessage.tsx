import { useState } from 'react'
import { ChatMessage as ChatMessageType } from '../../types'

interface ChatMessageProps {
  message: ChatMessageType
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const formatTimestamp = (timestamp: Date) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'user':
        return '👤'
      case 'assistant':
        return '🤖'
      case 'system':
        return '⚙️'
      default:
        return '💬'
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'user':
        return 'bg-blue-100 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
      case 'assistant':
        return 'bg-green-100 dark:bg-green-900/20 border-green-200 dark:border-green-800'
      case 'system':
        return 'bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700'
      default:
        return 'bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700'
    }
  }

  return (
    <div className={`flex space-x-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
      {message.role !== 'user' && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-sm">
          {getRoleIcon(message.role)}
        </div>
      )}
      
      <div
        className={`max-w-xs lg:max-w-md xl:max-w-2xl px-4 py-2 rounded-lg border ${
          message.role === 'user' 
            ? 'bg-blue-600 text-white border-blue-600' 
            : getRoleColor(message.role)
        }`}
      >
        <div className="flex items-start justify-between space-x-2">
          <div className="flex-1">
            <div className="text-sm font-medium mb-1">
              {message.role === 'user' ? 'You' : 'AI Assistant'}
            </div>
            
            <div className={`text-sm ${message.role === 'user' ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
              {message.content}
            </div>
            
            {message.attachments && message.attachments.length > 0 && (
              <div className="mt-2 space-y-1">
                {message.attachments.map((attachment) => (
                  <div
                    key={attachment.id}
                    className="flex items-center space-x-2 p-2 bg-white dark:bg-gray-700 rounded border"
                  >
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      📎 {attachment.name}
                    </span>
                    <span className="text-xs text-gray-400 dark:text-gray-500">
                      ({Math.round(attachment.size / 1024)}KB)
                    </span>
                  </div>
                ))}
              </div>
            )}
            
            {message.metadata && Object.keys(message.metadata).length > 0 && (
              <div className="mt-2">
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                >
                  {isExpanded ? 'Hide details' : 'Show details'}
                </button>
                
                {isExpanded && (
                  <div className="mt-2 p-2 bg-white dark:bg-gray-700 rounded border text-xs">
                    <pre className="whitespace-pre-wrap text-gray-600 dark:text-gray-300">
                      {JSON.stringify(message.metadata, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-1">
            <button
              onClick={() => copyToClipboard(message.content)}
              className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded transition-colors"
              title="Copy message"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className={`text-xs mt-2 ${
          message.role === 'user' ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
        }`}>
          {formatTimestamp(message.timestamp)}
        </div>
      </div>
      
      {message.role === 'user' && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-sm text-white">
          {getRoleIcon(message.role)}
        </div>
      )}
    </div>
  )
}

export default ChatMessage
