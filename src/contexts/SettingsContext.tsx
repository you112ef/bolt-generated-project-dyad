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
      return { ...state, apiProviders: state.apiProviders.map(p => p.id === action.payload.id ? { ...p, ...action.payload.updates } : p) }
    case 'REMOVE_API_PROVIDER':
      return { ...state, apiProviders: state.apiProviders.filter(p => p.id !== action.payload) }
    case 'TOGGLE_API_PROVIDER':
      return { ...state, apiProviders: state.apiProviders.map(p => p.id === action.payload ? { ...p, isActive: !p.isActive } : p) }
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

const SettingsContext = createContext<SettingsContextType | undefined>(undefined)

interface SettingsProviderProps { children: ReactNode }

export function SettingsProvider({ children }: SettingsProviderProps) {
  const [state, dispatch] = useReducer(settingsReducer, initialState)

  useEffect(() => {
    try {
      const saved = localStorage.getItem('app-settings')
      if (saved) {
        const parsed = JSON.parse(saved)
        if (parsed.theme && ['light', 'dark', 'system'].includes(parsed.theme)) {
          dispatch({ type: 'SET_THEME', payload: parsed.theme })
        }
        if (typeof parsed.language === 'string') {
          dispatch({ type: 'SET_LANGUAGE', payload: parsed.language })
        }
        if (typeof parsed.autoSave === 'boolean') {
          dispatch({ type: 'SET_AUTO_SAVE', payload: parsed.autoSave })
        }
        if (Array.isArray(parsed.apiProviders)) {
          dispatch({ type: 'SET_API_PROVIDERS', payload: parsed.apiProviders })
        }
        if (typeof parsed.githubToken === 'string') {
          dispatch({ type: 'SET_GITHUB_TOKEN', payload: parsed.githubToken })
        }
        if (typeof parsed.databaseUrl === 'string') {
          dispatch({ type: 'SET_DATABASE_URL', payload: parsed.databaseUrl })
        }
      }
    } catch (e) {
      console.error('Failed to load settings from localStorage:', e)
    }
  }, [])

  useEffect(() => {
    try { localStorage.setItem('app-settings', JSON.stringify(state)) } catch {}
  }, [state])

  const updateSettings = useCallback((updates: Partial<SettingsState>) => {
    Object.entries(updates).forEach(([key, value]) => {
      switch (key) {
        case 'theme':
          if (typeof value === 'string' && ['light', 'dark', 'system'].includes(value)) {
            dispatch({ type: 'SET_THEME', payload: value as 'light' | 'dark' | 'system' })
          }
          break
        case 'language':
          if (typeof value === 'string') {
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
            dispatch({ type: 'SET_API_PROVIDERS', payload: value as APIProvider[] })
          }
          break
        case 'githubToken':
          if (typeof value === 'string') {
            dispatch({ type: 'SET_GITHUB_TOKEN', payload: value })
          }
          break
        case 'databaseUrl':
          if (typeof value === 'string') {
            dispatch({ type: 'SET_DATABASE_URL', payload: value })
          }
          break
      }
    })
  }, [])

  const addAPIProvider = useCallback((provider: Omit<APIProvider, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newProvider: APIProvider = {
      ...provider,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    }
    dispatch({ type: 'ADD_API_PROVIDER', payload: newProvider })
  }, [])

  const removeAPIProvider = useCallback((id: string) => {
    dispatch({ type: 'REMOVE_API_PROVIDER', payload: id })
  }, [])

  const updateAPIProvider = useCallback((id: string, updates: Partial<APIProvider>) => {
    dispatch({ type: 'UPDATE_API_PROVIDER', payload: { id, updates } })
  }, [])

  const toggleAPIProvider = useCallback((id: string) => {
    dispatch({ type: 'TOGGLE_API_PROVIDER', payload: id })
  }, [])

  const getActiveProviders = useCallback(() => state.apiProviders.filter(p => p.isActive), [state.apiProviders])
  const getProviderById = useCallback((id: string) => state.apiProviders.find(p => p.id === id), [state.apiProviders])
  const getProvidersByType = useCallback((type: ProviderType) => state.apiProviders.filter(p => p.type === type), [state.apiProviders])

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
    resetSettings: () => dispatch({ type: 'RESET_SETTINGS' })
  }

  return <SettingsContext.Provider value={contextValue}>{children}</SettingsContext.Provider>
}

export function useSettings(): SettingsContextType {
  const ctx = useContext(SettingsContext)
  if (!ctx) throw new Error('useSettings must be used within a SettingsProvider')
  return ctx
}
