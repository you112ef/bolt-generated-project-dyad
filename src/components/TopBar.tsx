import { useState } from 'react'
import { useSettings } from '../contexts/SettingsContext'

interface TopBarProps {
  onViewChange: (view: 'chat' | 'editor' | 'settings') => void
}

const TopBar: React.FC<TopBarProps> = ({ onViewChange }) => {
  const { settings } = useSettings()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const activeProvidersCount = settings.apiProviders.filter(p => p.isActive).length

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            Dyad Web Demo
          </h1>
          
          <nav className="hidden md:flex space-x-1">
            <button
              onClick={() => onViewChange('chat')}
              className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
            >
              Chat
            </button>
            <button
              onClick={() => onViewChange('editor')}
              className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
            >
              Editor
            </button>
            <button
              onClick={() => onViewChange('settings')}
              className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
            >
              Settings
            </button>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          {/* Status indicators */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <div className={`w-2 h-2 rounded-full ${activeProvidersCount > 0 ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {activeProvidersCount} API Provider{activeProvidersCount !== 1 ? 's' : ''}
              </span>
            </div>
          </div>

          {/* Theme toggle */}
          <button
            onClick={() => {
              const newTheme = settings.theme === 'dark' ? 'light' : 'dark'
              settings.updateSettings({ theme: newTheme })
            }}
            className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {settings.theme === 'dark' ? '🌞' : '🌙'}
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-3 pb-3 border-t border-gray-200 dark:border-gray-700">
          <nav className="flex flex-col space-y-1">
            <button
              onClick={() => {
                onViewChange('chat')
                setIsMenuOpen(false)
              }}
              className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors text-left"
            >
              Chat
            </button>
            <button
              onClick={() => {
                onViewChange('editor')
                setIsMenuOpen(false)
              }}
              className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors text-left"
            >
              Editor
            </button>
            <button
              onClick={() => {
                onViewChange('settings')
                setIsMenuOpen(false)
              }}
              className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors text-left"
            >
              Settings
            </button>
          </nav>
        </div>
      )}
    </header>
  )
}

export default TopBar