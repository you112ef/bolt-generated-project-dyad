import { useState } from 'react'
import { useChat } from '../../contexts/ChatContext'
import ConversationSidebar from './ConversationSidebar'
import ChatHeader from './ChatHeader'
import MessagesList from './MessagesList'
import MessageInput from './MessageInput'

const ChatInterface: React.FC = () => {
  const { state, createConversation, loadConversation, deleteConversation, sendMessage } = useChat()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const handleNewConversation = () => {
    const title = `New Conversation ${state.conversations.length + 1}`
    createConversation(title)
  }

  const handleConversationSelect = (conversationId: string) => {
    loadConversation(conversationId)
    setIsSidebarOpen(false)
  }

  const handleConversationDelete = (conversationId: string) => {
    deleteConversation(conversationId)
  }

  return (
    <div className="flex h-full bg-gray-50 dark:bg-gray-900">
      {/* Conversation Sidebar */}
      <ConversationSidebar
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        conversations={state.conversations}
        activeConversationId={state.activeConversationId}
        onConversationSelect={handleConversationSelect}
        onConversationDelete={handleConversationDelete}
        onNewConversation={handleNewConversation}
      />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        <ChatHeader
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          conversation={state.conversations.find(c => c.id === state.activeConversationId)}
        />
        
        <MessagesList
          messages={state.messages}
          isLoading={state.isLoading}
          error={state.error}
        />
        
        <MessageInput
          onSendMessage={(content) => {
            sendMessage(content)
          }}
          disabled={state.isLoading}
        />
      </div>
    </div>
  )
}

export default ChatInterface
