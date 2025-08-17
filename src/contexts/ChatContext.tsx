import { createContext, useContext, useReducer, useCallback, ReactNode } from 'react'
import { ChatMessage, Conversation } from '../types'

// Chat state interface
interface ChatState {
  conversations: Conversation[]
  activeConversationId: string | null
  messages: ChatMessage[]
  isLoading: boolean
  error: string | null
}

// Chat action types
type ChatAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'ADD_MESSAGE'; payload: ChatMessage }
  | { type: 'UPDATE_MESSAGE'; payload: { id: string; updates: Partial<ChatMessage> } }
  | { type: 'REMOVE_MESSAGE'; payload: string }
  | { type: 'CLEAR_MESSAGES' }
  | { type: 'SET_CONVERSATIONS'; payload: Conversation[] }
  | { type: 'ADD_CONVERSATION'; payload: Conversation }
  | { type: 'UPDATE_CONVERSATION'; payload: { id: string; updates: Partial<Conversation> } }
  | { type: 'REMOVE_CONVERSATION'; payload: string }
  | { type: 'SET_ACTIVE_CONVERSATION'; payload: string | null }
  | { type: 'LOAD_CONVERSATION'; payload: string }

// Initial state
const initialState: ChatState = {
  conversations: [],
  activeConversationId: null,
  messages: [],
  isLoading: false,
  error: null
}

// Chat reducer
function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload }
    
    case 'SET_ERROR':
      return { ...state, error: action.payload }
    
    case 'ADD_MESSAGE':
      return { ...state, messages: [...state.messages, action.payload] }
    
    case 'UPDATE_MESSAGE':
      return {
        ...state,
        messages: state.messages.map(msg =>
          msg.id === action.payload.id ? { ...msg, ...action.payload.updates } : msg
        )
      }
    
    case 'REMOVE_MESSAGE':
      return {
        ...state,
        messages: state.messages.filter(msg => msg.id !== action.payload)
      }
    
    case 'CLEAR_MESSAGES':
      return { ...state, messages: [] }
    
    case 'SET_CONVERSATIONS':
      return { ...state, conversations: action.payload }
    
    case 'ADD_CONVERSATION':
      return { ...state, conversations: [...state.conversations, action.payload] }
    
    case 'UPDATE_CONVERSATION':
      return {
        ...state,
        conversations: state.conversations.map(conv =>
          conv.id === action.payload.id ? { ...conv, ...action.payload.updates } : conv
        )
      }
    
    case 'REMOVE_CONVERSATION':
      return {
        ...state,
        conversations: state.conversations.filter(conv => conv.id !== action.payload),
        activeConversationId: state.activeConversationId === action.payload ? null : state.activeConversationId
      }
    
    case 'SET_ACTIVE_CONVERSATION':
      return { ...state, activeConversationId: action.payload }
    
    case 'LOAD_CONVERSATION':
      const conversation = state.conversations.find(conv => conv.id === action.payload)
      return {
        ...state,
        activeConversationId: action.payload,
        messages: conversation ? conversation.messages : []
      }
    
    default:
      return state
  }
}

// Chat context interface
interface ChatContextType {
  state: ChatState
  sendMessage: (content: string, role?: 'user' | 'assistant' | 'system') => Promise<void>
  addMessage: (message: ChatMessage) => void
  updateMessage: (id: string, updates: Partial<ChatMessage>) => void
  removeMessage: (id: string) => void
  clearMessages: () => void
  createConversation: (title: string) => string
  loadConversation: (id: string) => void
  deleteConversation: (id: string) => void
  updateConversation: (id: string, updates: Partial<Conversation>) => void
  setActiveConversation: (id: string | null) => void
  getActiveConversation: () => Conversation | null
  isLoading: boolean
  error: string | null
}

// Create context
const ChatContext = createContext<ChatContextType | undefined>(undefined)

// Chat provider component
interface ChatProviderProps {
  children: ReactNode
}

export function ChatProvider({ children }: ChatProviderProps) {
  const [state, dispatch] = useReducer(chatReducer, initialState)

  // Send message function
  const sendMessage = useCallback(async (content: string, role: 'user' | 'assistant' | 'system' = 'user') => {
    const userMsg: ChatMessage = { id: Date.now().toString(), role, content, timestamp: new Date() }
    dispatch({ type: 'ADD_MESSAGE', payload: userMsg })

    if (role !== 'user') return
    dispatch({ type: 'SET_LOADING', payload: true })

    try {
      const history = [...state.messages, userMsg].map(m => ({ role: m.role, content: m.content }))
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ provider: 'openai', model: 'gpt-4o-mini', messages: history })
      })

      if (!res.body) throw new Error('No response body')

      const aiId = (Date.now() + 1).toString()
      const encoder = new TextEncoder()
      const reader = res.body.getReader()
      let assistantText = ''

      // Add placeholder assistant message
      dispatch({ type: 'ADD_MESSAGE', payload: { id: aiId, role: 'assistant', content: '', timestamp: new Date() } })

      const decoder = new TextDecoder()
      while (true) {
        const { value, done } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value)
        // OpenAI streams as SSE: lines starting with "data: {json}" and a [DONE]
        for (const line of chunk.split('\n')) {
          const trimmed = line.trim()
          if (!trimmed || !trimmed.startsWith('data:')) continue
          const data = trimmed.slice(5).trim()
          if (data === '[DONE]') continue
          try {
            const json = JSON.parse(data)
            const delta = json.choices?.[0]?.delta?.content || ''
            if (delta) {
              assistantText += delta
              dispatch({ type: 'UPDATE_MESSAGE', payload: { id: aiId, updates: { content: assistantText } } })
            }
          } catch {
            // Non-JSON or error
          }
        }
      }
    } catch (err: any) {
      dispatch({ type: 'SET_ERROR', payload: err?.message || 'Chat failed' })
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }, [state.messages])

  // Add message
  const addMessage = useCallback((message: ChatMessage) => {
    dispatch({ type: 'ADD_MESSAGE', payload: message })
  }, [])

  // Update message
  const updateMessage = useCallback((id: string, updates: Partial<ChatMessage>) => {
    dispatch({ type: 'UPDATE_MESSAGE', payload: { id, updates } })
  }, [])

  // Remove message
  const removeMessage = useCallback((id: string) => {
    dispatch({ type: 'REMOVE_MESSAGE', payload: id })
  }, [])

  // Clear messages
  const clearMessages = useCallback(() => {
    dispatch({ type: 'CLEAR_MESSAGES' })
  }, [])

  // Create conversation
  const createConversation = useCallback((title: string): string => {
    const id = Date.now().toString()
    const conversation: Conversation = {
      id,
      title,
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    dispatch({ type: 'ADD_CONVERSATION', payload: conversation })
    dispatch({ type: 'SET_ACTIVE_CONVERSATION', payload: id })
    
    return id
  }, [])

  // Load conversation
  const loadConversation = useCallback((id: string) => {
    dispatch({ type: 'LOAD_CONVERSATION', payload: id })
  }, [])

  // Delete conversation
  const deleteConversation = useCallback((id: string) => {
    dispatch({ type: 'REMOVE_CONVERSATION', payload: id })
  }, [])

  // Update conversation
  const updateConversation = useCallback((id: string, updates: Partial<Conversation>) => {
    dispatch({ type: 'UPDATE_CONVERSATION', payload: { id, updates } })
  }, [])

  // Set active conversation
  const setActiveConversation = useCallback((id: string | null) => {
    dispatch({ type: 'SET_ACTIVE_CONVERSATION', payload: id })
  }, [])

  // Get active conversation
  const getActiveConversation = useCallback((): Conversation | null => {
    if (!state.activeConversationId) return null
    return state.conversations.find(conv => conv.id === state.activeConversationId) || null
  }, [state.activeConversationId, state.conversations])

  const contextValue: ChatContextType = {
    state,
    sendMessage,
    addMessage,
    updateMessage,
    removeMessage,
    clearMessages,
    createConversation,
    loadConversation,
    deleteConversation,
    updateConversation,
    setActiveConversation,
    getActiveConversation,
    isLoading: state.isLoading,
    error: state.error
  }

  return (
    <ChatContext.Provider value={contextValue}>
      {children}
    </ChatContext.Provider>
  )
}

// Custom hook to use chat context
export function useChat(): ChatContextType {
  const context = useContext(ChatContext)
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider')
  }
  return context
}
