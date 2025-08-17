import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export interface APIProvider {
  id: string
  name: string
  type: 'llm' | 'code' | 'database'
  endpoint: string
  apiKey?: string
  isActive: boolean
}

export interface Settings {
  apiProviders: APIProvider[]
  githubToken?: string
  databaseUrl?: string
  theme: 'light' | 'dark' | 'auto'
  autoSave: boolean
}

interface SettingsContextType {
  settings: Settings
  updateSettings: (newSettings: Partial<Settings>) => void
  addAPIProvider: (provider: Omit<APIProvider, 'id'>) => void
  removeAPIProvider: (id: string) => void
  updateAPIProvider: (id: string, updates: Partial<APIProvider>) => void
  toggleAPIProvider: (id: string) => void
}

const defaultSettings: Settings = {
  apiProviders: [
    {
      id: 'openai-gpt4',
      name: 'OpenAI GPT-4',
      type: 'llm',
      endpoint: 'https://api.openai.com/v1/chat/completions',
      isActive: true
    },
    {
      id: 'anthropic-claude',
      name: 'Anthropic Claude',
      type: 'llm',
      endpoint: 'https://api.anthropic.com/v1/messages',
      isActive: false
    },
    {
      id: 'github-copilot',
      name: 'GitHub Copilot',
      type: 'code',
      endpoint: 'https://api.github.com/copilot',
      isActive: false
    },
    {
      id: 'postgres-db',
      name: 'PostgreSQL Database',
      type: 'database',
      endpoint: 'postgresql://localhost:5432/dyad',
      isActive: false
    }
  ],
  theme: 'dark',
  autoSave: true
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined)

export const useSettings = () => {
  const context = useContext(SettingsContext)
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider')
  }
  return context
}

interface SettingsProviderProps {
  children: ReactNode
}

export const SettingsProvider: React.FC<SettingsProviderProps> = ({ children }) => {
  const [settings, setSettings] = useState<Settings>(() => {
    const saved = localStorage.getItem('dyad-settings')
    return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings
  })

  useEffect(() => {
    localStorage.setItem('dyad-settings', JSON.stringify(settings))
  }, [settings])

  const updateSettings = (newSettings: Partial<Settings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }))
  }

  const addAPIProvider = (provider: Omit<APIProvider, 'id'>) => {
    const newProvider: APIProvider = {
      ...provider,
      id: `provider-${Date.now()}`
    }
    setSettings(prev => ({
      ...prev,
      apiProviders: [...prev.apiProviders, newProvider]
    }))
  }

  const removeAPIProvider = (id: string) => {
    setSettings(prev => ({
      ...prev,
      apiProviders: prev.apiProviders.filter(p => p.id !== id)
    }))
  }

  const updateAPIProvider = (id: string, updates: Partial<APIProvider>) => {
    setSettings(prev => ({
      ...prev,
      apiProviders: prev.apiProviders.map(p =>
        p.id === id ? { ...p, ...updates } : p
      )
    }))
  }

  const toggleAPIProvider = (id: string) => {
    setSettings(prev => ({
      ...prev,
      apiProviders: prev.apiProviders.map(p =>
        p.id === id ? { ...p, isActive: !p.isActive } : p
      )
    }))
  }

  const value: SettingsContextType = {
    settings,
    updateSettings,
    addAPIProvider,
    removeAPIProvider,
    updateAPIProvider,
    toggleAPIProvider
  }

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  )
}