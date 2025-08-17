import { useState } from 'react'
import { useSettings } from '../../contexts/SettingsContext'
import { APIProvider, ProviderType } from '../../types'

const Settings: React.FC = () => {
  const { settings, addAPIProvider, removeAPIProvider, updateAPIProvider, toggleAPIProvider, updateSettings } = useSettings()
  const [showAddProvider, setShowAddProvider] = useState(false)
  const [editingProvider, setEditingProvider] = useState<APIProvider | null>(null)
  const [newProvider, setNewProvider] = useState({
    name: '',
    type: 'openai' as ProviderType,
    baseUrl: '',
    apiKey: '',
    isActive: true,
    config: {}
  })

  const handleAddProvider = () => {
    if (newProvider.name && newProvider.baseUrl && newProvider.apiKey) {
      addAPIProvider(newProvider)
      setNewProvider({
        name: '',
        type: 'openai',
        baseUrl: '',
        apiKey: '',
        isActive: true,
        config: {}
      })
      setShowAddProvider(false)
    }
  }

  const handleEditProvider = (provider: APIProvider) => {
    setEditingProvider(provider)
    setNewProvider({
      name: provider.name,
      type: provider.type,
      baseUrl: provider.baseUrl,
      apiKey: provider.apiKey,
      isActive: provider.isActive,
      config: provider.config
    })
    setShowAddProvider(true)
  }

  const handleUpdateProvider = () => {
    if (editingProvider && newProvider.name && newProvider.baseUrl && newProvider.apiKey) {
      updateAPIProvider(editingProvider.id, newProvider)
      setEditingProvider(null)
      setNewProvider({
        name: '',
        type: 'openai',
        baseUrl: '',
        apiKey: '',
        isActive: true,
        config: {}
      })
      setShowAddProvider(false)
    }
  }

  const handleCancel = () => {
    setShowAddProvider(false)
    setEditingProvider(null)
    setNewProvider({
      name: '',
      type: 'openai',
      baseUrl: '',
      apiKey: '',
      isActive: true,
      config: {}
    })
  }

  const getProviderConfigFields = (type: ProviderType) => {
    switch (type) {
      case 'openai':
        return [
          { key: 'model', label: 'Model', type: 'text', placeholder: 'gpt-4' },
          { key: 'maxTokens', label: 'Max Tokens', type: 'number', placeholder: '4096' },
          { key: 'temperature', label: 'Temperature', type: 'number', placeholder: '0.7' }
        ]
      case 'anthropic':
        return [
          { key: 'model', label: 'Model', type: 'text', placeholder: 'claude-3-sonnet' },
          { key: 'maxTokens', label: 'Max Tokens', type: 'number', placeholder: '4096' }
        ]
      case 'google':
        return [
          { key: 'model', label: 'Model', type: 'text', placeholder: 'gemini-pro' },
          { key: 'temperature', label: 'Temperature', type: 'number', placeholder: '0.7' }
        ]
      default:
        return []
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Settings</h2>
        
        {/* General Settings */}
        <div className="space-y-4 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">General</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Theme
              </label>
              <select
                value={settings.theme}
                onChange={(e) => updateSettings({ theme: e.target.value as 'light' | 'dark' | 'system' })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">System</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Language
              </label>
              <select
                value={settings.language}
                onChange={(e) => updateSettings({ language: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="en">English</option>
                <option value="ar">العربية</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
              </select>
            </div>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="autoSave"
              checked={settings.autoSave}
              onChange={(e) => updateSettings({ autoSave: e.target.checked })}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="autoSave" className="ml-2 block text-sm text-gray-900 dark:text-white">
              Auto-save changes
            </label>
          </div>
        </div>

        {/* API Providers */}
        <div className="space-y-4 mb-8">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">API Providers</h3>
            <button
              onClick={() => setShowAddProvider(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Add Provider
            </button>
          </div>

          {/* Provider List */}
          <div className="space-y-3">
            {settings.apiProviders.map((provider) => (
              <div
                key={provider.id}
                className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800"
              >
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={provider.isActive}
                    onChange={() => toggleAPIProvider(provider.id)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">{provider.name}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {provider.type} • {provider.baseUrl}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleEditProvider(provider)}
                    className="px-3 py-1 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => removeAPIProvider(provider.id)}
                    className="px-3 py-1 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            
            {settings.apiProviders.length === 0 && (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                No API providers configured. Add one to get started.
              </div>
            )}
          </div>
        </div>

        {/* GitHub Integration */}
        <div className="space-y-4 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">GitHub Integration</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              GitHub Personal Access Token
            </label>
            <input
              type="password"
              value={settings.githubToken || ''}
              onChange={(e) => updateSettings({ githubToken: e.target.value })}
              placeholder="ghp_..."
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Used for repository access and authentication
            </p>
          </div>
        </div>

        {/* Database Connection */}
        <div className="space-y-4 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Database Connection</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Database URL
            </label>
            <input
              type="text"
              value={settings.databaseUrl || ''}
              onChange={(e) => updateSettings({ databaseUrl: e.target.value })}
              placeholder="postgresql://user:password@localhost:5432/database"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Connection string for your database
            </p>
          </div>
        </div>
      </div>

      {/* Add/Edit Provider Modal */}
      {showAddProvider && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {editingProvider ? 'Edit Provider' : 'Add Provider'}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={newProvider.name}
                  onChange={(e) => setNewProvider({ ...newProvider, name: e.target.value })}
                  placeholder="OpenAI"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Type
                </label>
                <select
                  value={newProvider.type}
                  onChange={(e) => setNewProvider({ ...newProvider, type: e.target.value as ProviderType })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="openai">OpenAI</option>
                  <option value="anthropic">Anthropic</option>
                  <option value="google">Google</option>
                  <option value="azure">Azure</option>
                  <option value="custom">Custom</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Base URL
                </label>
                <input
                  type="text"
                  value={newProvider.baseUrl}
                  onChange={(e) => setNewProvider({ ...newProvider, baseUrl: e.target.value })}
                  placeholder="https://api.openai.com/v1"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  API Key
                </label>
                <input
                  type="password"
                  value={newProvider.apiKey}
                  onChange={(e) => setNewProvider({ ...newProvider, apiKey: e.target.value })}
                  placeholder="sk-..."
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Dynamic config fields based on provider type */}
              {getProviderConfigFields(newProvider.type).map((field) => (
                <div key={field.key}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    value={(newProvider.config as any)[field.key] || ''}
                    onChange={(e) => setNewProvider({
                      ...newProvider,
                      config: {
                        ...newProvider.config,
                        [field.key]: e.target.value
                      }
                    })}
                    placeholder={field.placeholder}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              ))}
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={handleCancel}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={editingProvider ? handleUpdateProvider : handleAddProvider}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                {editingProvider ? 'Update' : 'Add'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Settings