import React, { useState } from 'react'
import { useSettings } from '../contexts/SettingsContext'
import './TopBar.css'

interface TopBarProps {
  activeView: 'chat' | 'editor' | 'settings'
  onViewChange: (view: 'chat' | 'editor' | 'settings') => void
}

const TopBar: React.FC<TopBarProps> = ({ activeView, onViewChange }) => {
  const { settings } = useSettings()
  const [isGitHubAuthenticated, setIsGitHubAuthenticated] = useState(false)
  const [showGitHubMenu, setShowGitHubMenu] = useState(false)

  const handleGitHubAuth = () => {
    // In production, this would redirect to GitHub OAuth
    // For demo purposes, we'll simulate authentication
    setIsGitHubAuthenticated(true)
    setShowGitHubMenu(false)
  }

  const handleGitHubLogout = () => {
    setIsGitHubAuthenticated(false)
    setShowGitHubMenu(false)
  }

  const getActiveProvidersCount = () => {
    return settings.apiProviders.filter(p => p.isActive).length
  }

  return (
    <header className="top-bar">
      <div className="top-bar-left">
        <div className="logo">
          <span className="logo-icon">⚡</span>
          <span className="logo-text">Dyad</span>
        </div>
        
        <nav className="navigation">
          <button
            className={`nav-tab ${activeView === 'chat' ? 'active' : ''}`}
            onClick={() => onViewChange('chat')}
          >
            <span className="nav-icon">💬</span>
            Chat
          </button>
          <button
            className={`nav-tab ${activeView === 'editor' ? 'active' : ''}`}
            onClick={() => onViewChange('editor')}
          >
            <span className="nav-icon">📝</span>
            Editor
          </button>
          <button
            className={`nav-tab ${activeView === 'settings' ? 'active' : ''}`}
            onClick={() => onViewChange('settings')}
          >
            <span className="nav-icon">⚙️</span>
            Settings
          </button>
        </nav>
      </div>

      <div className="top-bar-right">
        <div className="status-indicators">
          <div className="provider-status">
            <span className="status-icon">🔌</span>
            <span className="status-text">
              {getActiveProvidersCount()} Active
            </span>
          </div>
          
          <div className="connection-status">
            <span className="status-icon">🌐</span>
            <span className="status-text">Connected</span>
          </div>
        </div>

        <div className="user-section">
          <div className="github-auth">
            {isGitHubAuthenticated ? (
              <div className="github-user">
                <button
                  className="github-button authenticated"
                  onClick={() => setShowGitHubMenu(!showGitHubMenu)}
                >
                  <span className="github-icon">🐙</span>
                  <span className="github-username">Authenticated</span>
                  <span className="dropdown-arrow">▼</span>
                </button>
                
                {showGitHubMenu && (
                  <div className="github-menu">
                    <button className="menu-item" onClick={handleGitHubLogout}>
                      <span className="menu-icon">🚪</span>
                      Sign Out
                    </button>
                    <button className="menu-item">
                      <span className="menu-icon">👤</span>
                      Profile
                    </button>
                    <button className="menu-item">
                      <span className="menu-icon">🔑</span>
                      API Keys
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button className="github-button" onClick={handleGitHubAuth}>
                <span className="github-icon">🐙</span>
                <span className="github-text">Sign in with GitHub</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default TopBar