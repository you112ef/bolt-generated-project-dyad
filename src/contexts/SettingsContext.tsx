import { createContext, useContext, useReducer, useCallback, ReactNode, useEffect } from 'react'
import { APIProvider, ProviderType } from '../types'

// Settings state interface
interface SettingsState {
  theme: 'light' | 'dark' | 'system'
  language: string
  autoSave: boolean
  apiProviders: APIProvider[]
  githubToken?: string
  databaseUrl?: string
}

// Settings action types
type SettingsAction =
  | { type: 'SET_THEME'; payload: 'light' | 'dark' | 'system' }
  | { type: 'SET_LANGUAGE'; payload: string }
  | { type: 'SET_AUTO_SAVE'; payload: boolean }
  | { type: 'SET_API_PROVIDERS'; payload: APIProvider[] }
  | { type: 'ADD_API_PROVIDER'; payload: APIProvider }
  | { type: 'UPDATE_API_PROVIDER'; payload: { id: string; updates: Partial<APIProvider> } }
  | { type: 'REMOVE_API_PROVIDER'; payload: string }
  | { type: 'TOGGLE_API_PROVIDER'; payload: string }
  | { type: 'SET_GITHUB_TOKEN'; payload: string }
  | { type: 'SET_DATABASE_URL'; payload: string }
  | { type: 'RESET_SETTINGS' }

// Initial state
const initialState: SettingsState = {
  theme: 'system',
  language: 'en',
  autoSave: true,
  apiProviders: [],
  githubToken: undefined,
  databaseUrl: undefined
}

// Settings reducer
function settingsReducer(state: SettingsState, action: SettingsAction): SettingsState {
  switch (action.type) {
    case 'SET_THEME':
      return { ...state, theme: action.payload }
    
    case 'SET_LANGUAGE':
      return { ...state, language: action.payload }
    
    case 'SET_AUTO_SAVE':
      return { ...state, autoSave: action.payload }
    
    case 'SET_API_PROVIDERS':
      return { ...state, apiProviders: action.payload }
    
    case 'ADD_API_PROVIDER':
      return { ...state, apiProviders: [...state.apiProviders, action.payload] }
    
    case 'UPDATE_API_PROVIDER':
      return {
        ...state,
        apiProviders: state.apiProviders.map(provider =>
          provider.id === action.payload.id ? { ...provider, ...action.payload.updates } : provider
        )
      }
    
    case 'REMOVE_API_PROVIDER':
      return {
        ...state,
        apiProviders: state.apiProviders.filter(provider => provider.id !== action.payload)
      }
    
    case 'TOGGLE_API_PROVIDER':
      return {
        ...state,
        apiProviders: state.apiProviders.map(provider =>
          provider.id === action.payload ? { ...provider, isActive: !provider.isActive } : provider
        )
      }
    
    case 'SET_GITHUB_TOKEN':
      return { ...state, githubToken: action.payload }
    
    case 'SET_DATABASE_URL':
      return { ...state, databaseUrl: action.payload }
    
    case 'RESET_SETTINGS':
      return initialState
    
    default:
      return state
  }
}

// Settings context interface
interface SettingsContextType {
  settings: SettingsState
  updateSettings: (updates: Partial<SettingsState>) => void
  addAPIProvider: (provider: Omit<APIProvider, 'id' | 'createdAt' | 'updatedAt'>) => void
  removeAPIProvider: (id: string) => void
  updateAPIProvider: (id: string, updates: Partial<APIProvider>) => void
  toggleAPIProvider: (id: string) => void
  getActiveProviders: () => APIProvider[]
  getProviderById: (id: string) => APIProvider | undefined
  getProvidersByType: (type: ProviderType) => APIProvider[]
  resetSettings: () => void
}

// Create context
const SettingsContext = createContext<SettingsContextType | undefined>(undefined)

// Settings provider component
interface SettingsProviderProps {
  children: ReactNode
}

export function SettingsProvider({ children }: SettingsProviderProps) {
  const [state, dispatch] = useReducer(settingsReducer, initialState)

  // Load settings from localStorage on mount
  useEffect(() => {
    try {
      const savedSettings = localStorage.getItem('app-settings')
      if (savedSettings) {
        const parsed = JSON.parse(savedSettings)
        // Only restore valid settings
        if (parsed.theme && ['light', 'dark', 'system'].includes(parsed.theme)) {
          dispatch({ type: 'SET_THEME', payload: parsed.theme })
        }
        if (parsed.language && typeof parsed.language === 'string') {
          dispatch({ type: 'SET_LANGUAGE', payload: parsed.language })
        }
        if (typeof parsed.autoSave === 'boolean') {
          dispatch({ type: 'SET_AUTO_SAVE', payload: parsed.autoSave })
        }
        if (Array.isArray(parsed.apiProviders)) {
          dispatch({ type: 'SET_API_PROVIDERS', payload: parsed.apiProviders })
        }
        if (parsed.githubToken && typeof parsed.githubToken === 'string') {
          dispatch({ type: 'SET_GITHUB_TOKEN', payload: parsed.githubToken })
        }
        if (parsed.databaseUrl && typeof parsed.databaseUrl === 'string') {
          dispatch({ type: 'SET_DATABASE_URL', payload: parsed.databaseUrl })
        }
      }
    } catch (error) {
      console.error('Failed to load settings from localStorage:', error)
    }
  }, [])

  // Save settings to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('app-settings', JSON.stringify(state))
    } catch (error) {
      console.error('Failed to save settings to localStorage:', error)
    }
  }, [state])

  // Update settings
  const updateSettings = useCallback((updates: Partial<SettingsState>) => {
    Object.entries(updates).forEach(([key, value]) => {
      switch (key) {
        case 'theme':
          if (value && ['light', 'dark', 'system'].includes(value)) {
            dispatch({ type: 'SET_THEME', payload: value as 'light' | 'dark' | 'system' })
          }
          break
        case 'language':
          if (value) {
            dispatch({ type: 'SET_LANGUAGE', payload: value })
          }
          break
        case 'autoSave':
          if (typeof value === 'boolean') {
            dispatch({ type: 'SET_AUTO_SAVE', payload: value })
          }
          break
        case 'apiProviders':
          if (Array.isArray(value)) {
            dispatch({ type: 'SET_API_PROVIDERS', payload: value })
          }
          break
        case 'githubToken':
          dispatch({ type: 'SET_GITHUB_TOKEN', payload: value })
          break
        case 'databaseUrl':
          dispatch({ type: 'SET_DATABASE_URL', payload: value })
          break
      }
    })
  }, [])

  // Add API provider
  const addAPIProvider = useCallback((provider: Omit<APIProvider, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newProvider: APIProvider = {
      ...provider,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    }
    dispatch({ type: 'ADD_API_PROVIDER', payload: newProvider })
  }, [])

  // Remove API provider
  const removeAPIProvider = useCallback((id: string) => {
    dispatch({ type: 'REMOVE_API_PROVIDER', payload: id })
  }, [])

  // Update API provider
  const updateAPIProvider = useCallback((id: string, updates: Partial<APIProvider>) => {
    dispatch({ type: 'UPDATE_API_PROVIDER', payload: { id, updates } })
  }, [])

  // Toggle API provider
  const toggleAPIProvider = useCallback((id: string) => {
    dispatch({ type: 'TOGGLE_API_PROVIDER', payload: id })
  }, [])

  // Get active providers
  const getActiveProviders = useCallback(() => {
    return state.apiProviders.filter(provider => provider.isActive)
  }, [state.apiProviders])

  // Get provider by ID
  const getProviderById = useCallback((id: string) => {
    return state.apiProviders.find(provider => provider.id === id)
  }, [state.apiProviders])

  // Get providers by type
  const getProvidersByType = useCallback((type: ProviderType) => {
    return state.apiProviders.filter(provider => provider.type === type)
  }, [state.apiProviders])

  // Reset settings
  const resetSettings = useCallback(() => {
    dispatch({ type: 'RESET_SETTINGS' })
  }, [])

  const contextValue: SettingsContextType = {
    settings: state,
    updateSettings,
    addAPIProvider,
    removeAPIProvider,
    updateAPIProvider,
    toggleAPIProvider,
    getActiveProviders,
    getProviderById,
    getProvidersByType,
    resetSettings
  }

  return (
    <SettingsContext.Provider value={contextValue}>
      {children}
    </SettingsContext.Provider>
  )
}

// Custom hook to use settings context
export function useSettings(): SettingsContextType {
  const context = useContext(SettingsContext)
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider')
  }
  return context
}
