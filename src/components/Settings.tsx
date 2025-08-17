import React, { useState } from 'react'
import { useSettings, APIProvider } from '../contexts/SettingsContext'
import './Settings.css'

const Settings: React.FC = () => {
  const { 
    settings, 
    updateSettings, 
    addAPIProvider, 
    removeAPIProvider, 
    updateAPIProvider,
    toggleAPIProvider 
  } = useSettings()
  
  const [showAddProvider, setShowAddProvider] = useState(false)
  const [editingProvider, setEditingProvider] = useState<APIProvider | null>(null)
  const [newProvider, setNewProvider] = useState({
    name: '',
    type: 'llm' as const,
    endpoint: '',
    apiKey: ''
  })

  const handleAddProvider = () => {
    if (newProvider.name && newProvider.endpoint) {
      addAPIProvider(newProvider)
      setNewProvider({ name: '', type: 'llm', endpoint: '', apiKey: '' })
      setShowAddProvider(false)
    }
  }

  const handleEditProvider = (provider: APIProvider) => {
    setEditingProvider(provider)
    setNewProvider({
      name: provider.name,
      type: provider.type,
      endpoint: provider.endpoint,
      apiKey: provider.apiKey || ''
    })
    setShowAddProvider(true)
  }

  const handleUpdateProvider = () => {
    if (editingProvider && newProvider.name && newProvider.endpoint) {
      updateAPIProvider(editingProvider.id, newProvider)
      setEditingProvider(null)
      setNewProvider({ name: '', type: 'llm', endpoint: '', apiKey: '' })
      setShowAddProvider(false)
    }
  }

  const handleCancelEdit = () => {
    setEditingProvider(null)
    setNewProvider({ name: '', type: 'llm', endpoint: '', apiKey: '' })
    setShowAddProvider(false)
  }

  const getProviderIcon = (type: string) => {
    switch (type) {
      case 'llm': return '🧠'
      case 'code': return '💻'
      case 'database': return '🗄️'
      default: return '🔌'
    }
  }

  const getProviderTypeLabel = (type: string) => {
    switch (type) {
      case 'llm': return 'Language Model'
      case 'code': return 'Code Assistant'
      case 'database': return 'Database'
      default: return 'Other'
    }
  }

  return (
    <div className="settings">
      <div className="settings-header">
        <h1>Settings</h1>
        <p>Configure your API providers and application preferences</p>
      </div>

      <div className="settings-content">
        <div className="settings-section">
          <div className="section-header">
            <h2>API Providers</h2>
            <button
              className="add-provider-btn"
              onClick={() => setShowAddProvider(true)}
            >
              <span className="btn-icon">➕</span>
              Add Provider
            </button>
          </div>

          {showAddProvider && (
            <div className="add-provider-form">
              <h3>{editingProvider ? 'Edit Provider' : 'Add New Provider'}</h3>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="provider-name">Name</label>
                  <input
                    type="text"
                    id="provider-name"
                    value={newProvider.name}
                    onChange={(e) => setNewProvider({ ...newProvider, name: e.target.value })}
                    placeholder="Provider name"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="provider-type">Type</label>
                  <select
                    id="provider-type"
                    value={newProvider.type}
                    onChange={(e) => setNewProvider({ ...newProvider, type: e.target.value as any })}
                  >
                    <option value="llm">🧠 Language Model</option>
                    <option value="code">💻 Code Assistant</option>
                    <option value="database">🗄️ Database</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="provider-endpoint">Endpoint</label>
                <input
                  type="url"
                  id="provider-endpoint"
                  value={newProvider.endpoint}
                  onChange={(e) => setNewProvider({ ...newProvider, endpoint: e.target.value })}
                  placeholder="https://api.example.com/v1"
                />
              </div>

              <div className="form-group">
                <label htmlFor="provider-apikey">API Key (Optional)</label>
                <input
                  type="password"
                  id="provider-apikey"
                  value={newProvider.apiKey}
                  onChange={(e) => setNewProvider({ ...newProvider, apiKey: e.target.value })}
                  placeholder="Enter API key if required"
                />
              </div>

              <div className="form-actions">
                {editingProvider ? (
                  <>
                    <button
                      className="btn btn-primary"
                      onClick={handleUpdateProvider}
                    >
                      Update Provider
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={handleCancelEdit}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="btn btn-primary"
                      onClick={handleAddProvider}
                    >
                      Add Provider
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={() => setShowAddProvider(false)}
                    >
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </div>
          )}

          <div className="providers-list">
            {settings.apiProviders.map((provider) => (
              <div key={provider.id} className="provider-item">
                <div className="provider-info">
                  <div className="provider-icon">
                    {getProviderIcon(provider.type)}
                  </div>
                  <div className="provider-details">
                    <h4>{provider.name}</h4>
                    <p className="provider-type">{getProviderTypeLabel(provider.type)}</p>
                    <p className="provider-endpoint">{provider.endpoint}</p>
                  </div>
                </div>
                
                <div className="provider-actions">
                  <button
                    className={`toggle-btn ${provider.isActive ? 'active' : ''}`}
                    onClick={() => toggleAPIProvider(provider.id)}
                    title={provider.isActive ? 'Deactivate' : 'Activate'}
                  >
                    {provider.isActive ? '🟢' : '⚪'}
                  </button>
                  
                  <button
                    className="edit-btn"
                    onClick={() => handleEditProvider(provider)}
                    title="Edit"
                  >
                    ✏️
                  </button>
                  
                  <button
                    className="delete-btn"
                    onClick={() => removeAPIProvider(provider.id)}
                    title="Delete"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="settings-section">
          <h2>GitHub Integration</h2>
          <div className="form-group">
            <label htmlFor="github-token">GitHub Personal Access Token</label>
            <input
              type="password"
              id="github-token"
              value={settings.githubToken || ''}
              onChange={(e) => updateSettings({ githubToken: e.target.value })}
              placeholder="Enter your GitHub token"
            />
            <p className="help-text">
              Create a token at <a href="https://github.com/settings/tokens" target="_blank" rel="noopener noreferrer">github.com/settings/tokens</a>
            </p>
          </div>
        </div>

        <div className="settings-section">
          <h2>Database Connection</h2>
          <div className="form-group">
            <label htmlFor="database-url">Database URL</label>
            <input
              type="url"
              id="database-url"
              value={settings.databaseUrl || ''}
              onChange={(e) => updateSettings({ databaseUrl: e.target.value })}
              placeholder="postgresql://user:pass@localhost:5432/db"
            />
            <p className="help-text">
              Supports PostgreSQL, MySQL, SQLite, and MongoDB connection strings
            </p>
          </div>
        </div>

        <div className="settings-section">
          <h2>Preferences</h2>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="theme-select">Theme</label>
              <select
                id="theme-select"
                value={settings.theme}
                onChange={(e) => updateSettings({ theme: e.target.value as any })}
              >
                <option value="dark">🌙 Dark</option>
                <option value="light">☀️ Light</option>
                <option value="auto">🔄 Auto</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="auto-save">Auto Save</label>
              <div className="toggle-switch">
                <input
                  type="checkbox"
                  id="auto-save"
                  checked={settings.autoSave}
                  onChange={(e) => updateSettings({ autoSave: e.target.checked })}
                />
                <label htmlFor="auto-save" className="toggle-label"></label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings