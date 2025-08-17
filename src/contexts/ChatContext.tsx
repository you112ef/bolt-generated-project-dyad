import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useSettings } from './SettingsContext'

export interface Message {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: Date
  metadata?: {
    provider?: string
    model?: string
    tokens?: number
    duration?: number
  }
}

export interface Conversation {
  id: string
  title: string
  messages: Message[]
  createdAt: Date
  updatedAt: Date
  isActive: boolean
}

interface ChatContextType {
  conversations: Conversation[]
  activeConversation: Conversation | null
  messages: Message[]
  isLoading: boolean
  error: string | null
  createConversation: (title?: string) => void
  setActiveConversation: (id: string) => void
  sendMessage: (content: string) => Promise<void>
  clearConversation: (id: string) => void
  deleteConversation: (id: string) => void
  updateConversationTitle: (id: string, title: string) => void
}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

export const useChat = () => {
  const context = useContext(ChatContext)
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider')
  }
  return context
}

interface ChatProviderProps {
  children: ReactNode
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const { settings } = useSettings()
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const messages = activeConversation?.messages || []

  useEffect(() => {
    const savedConversations = localStorage.getItem('dyad-conversations')
    if (savedConversations) {
      const parsed = JSON.parse(savedConversations)
      const conversationsWithDates = parsed.map((conv: any) => ({
        ...conv,
        createdAt: new Date(conv.createdAt),
        updatedAt: new Date(conv.updatedAt),
        messages: conv.messages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }))
      }))
      setConversations(conversationsWithDates)
      
      // Set first conversation as active if none is active
      if (conversationsWithDates.length > 0 && !conversationsWithDates.find(c => c.isActive)) {
        setActiveConversation(conversationsWithDates[0])
      }
    } else {
      // Create default conversation
      createConversation('New Chat')
    }
  }, [])

  useEffect(() => {
    if (conversations.length > 0) {
      localStorage.setItem('dyad-conversations', JSON.stringify(conversations))
    }
  }, [conversations])

  const createConversation = (title?: string) => {
    const newConversation: Conversation = {
      id: `conv-${Date.now()}`,
      title: title || `New Chat ${conversations.length + 1}`,
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true
    }

    // Deactivate all other conversations
    const updatedConversations = conversations.map(conv => ({
      ...conv,
      isActive: false
    }))

    setConversations([...updatedConversations, newConversation])
    setActiveConversation(newConversation)
  }

  const setActiveConversationById = (id: string) => {
    const conversation = conversations.find(c => c.id === id)
    if (conversation) {
      // Deactivate all other conversations
      const updatedConversations = conversations.map(conv => ({
        ...conv,
        isActive: conv.id === id
      }))
      setConversations(updatedConversations)
      setActiveConversation(conversation)
    }
  }

  const sendMessage = async (content: string) => {
    if (!activeConversation) return

    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content,
      timestamp: new Date()
    }

    // Add user message
    const updatedConversation = {
      ...activeConversation,
      messages: [...activeConversation.messages, userMessage],
      updatedAt: new Date()
    }

    setActiveConversation(updatedConversation)
    setConversations(prev => 
      prev.map(c => c.id === activeConversation.id ? updatedConversation : c)
    )

    // Get active API providers
    const activeProviders = settings.apiProviders.filter(p => p.isActive)
    
    if (activeProviders.length === 0) {
      setError('No active API providers. Please configure providers in Settings.')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // Send to first active LLM provider
      const llmProvider = activeProviders.find(p => p.type === 'llm')
      if (llmProvider) {
        const response = await sendToLLMProvider(llmProvider, content, activeConversation.messages)
        
        const assistantMessage: Message = {
          id: `msg-${Date.now()}-response`,
          role: 'assistant',
          content: response,
          timestamp: new Date(),
          metadata: {
            provider: llmProvider.name,
            model: 'gpt-4' // This would come from the actual API response
          }
        }

        const finalConversation = {
          ...updatedConversation,
          messages: [...updatedConversation.messages, assistantMessage],
          updatedAt: new Date()
        }

        setActiveConversation(finalConversation)
        setConversations(prev => 
          prev.map(c => c.id === activeConversation.id ? finalConversation : c)
        )
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message')
    } finally {
      setIsLoading(false)
    }
  }

  const sendToLLMProvider = async (provider: any, content: string, history: Message[]): Promise<string> => {
    // This is a mock implementation - in production, you'd make actual API calls
    // based on the provider type and endpoint
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000))
    
    // Mock responses based on content
    if (content.toLowerCase().includes('hello') || content.toLowerCase().includes('hi')) {
      return 'Hello! How can I help you today? I can assist with coding, answer questions, or help you explore ideas.'
    } else if (content.toLowerCase().includes('code') || content.toLowerCase().includes('program')) {
      return 'I\'d be happy to help you with coding! What programming language or framework would you like to work with? I can help with syntax, debugging, architecture, or best practices.'
    } else if (content.toLowerCase().includes('help')) {
      return 'I\'m here to help! I can assist with:\n\n• Code review and suggestions\n• Debugging and problem solving\n• Architecture and design patterns\n• Best practices and optimization\n• Learning new technologies\n\nWhat would you like to work on?'
    } else {
      return 'Thank you for your message! I\'m here to help with any questions or tasks you have. Feel free to ask about coding, problem solving, or any other topics you\'d like to explore.'
    }
  }

  const clearConversation = (id: string) => {
    setConversations(prev => 
      prev.map(c => c.id === id ? { ...c, messages: [] } : c)
    )
    if (activeConversation?.id === id) {
      setActiveConversation({ ...activeConversation, messages: [] })
    }
  }

  const deleteConversation = (id: string) => {
    setConversations(prev => prev.filter(c => c.id !== id))
    if (activeConversation?.id === id) {
      const remaining = conversations.filter(c => c.id !== id)
      setActiveConversation(remaining.length > 0 ? remaining[0] : null)
    }
  }

  const updateConversationTitle = (id: string, title: string) => {
    setConversations(prev => 
      prev.map(c => c.id === id ? { ...c, title } : c)
    )
    if (activeConversation?.id === id) {
      setActiveConversation({ ...activeConversation, title })
    }
  }

  const value: ChatContextType = {
    conversations,
    activeConversation,
    messages,
    isLoading,
    error,
    createConversation,
    setActiveConversation: setActiveConversationById,
    sendMessage,
    clearConversation,
    deleteConversation,
    updateConversationTitle
  }

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  )
}