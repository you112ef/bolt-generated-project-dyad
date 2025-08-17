// Core types
export interface Message {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: Date
  metadata?: MessageMetadata
}

export interface MessageMetadata {
  provider?: string
  model?: string
  tokens?: number
  duration?: number
  error?: string
  files?: FileAttachment[]
  state?: CustomTagState
}

export interface Conversation {
  id: string
  title: string
  messages: Message[]
  createdAt: Date
  updatedAt: Date
  isActive: boolean
  providerId?: string
  appId?: string
}

export interface FileAttachment {
  id: string
  file: File
  type: 'chat-context' | 'upload-to-codebase'
  name: string
  size: number
  mimeType: string
  uploadedAt: Date
}

export interface APIProvider {
  id: string
  name: string
  type: 'llm' | 'code' | 'database' | 'file' | 'auth'
  endpoint: string
  apiKey?: string
  isActive: boolean
  config: ProviderConfig
  metadata?: ProviderMetadata
}

export interface ProviderConfig {
  models?: string[]
  maxTokens?: number
  temperature?: number
  timeout?: number
  rateLimit?: number
  features?: string[]
}

export interface ProviderMetadata {
  description?: string
  website?: string
  documentation?: string
  pricing?: string
  supportedLanguages?: string[]
}

export interface LanguageModel {
  id: string
  name: string
  provider: string
  contextLength: number
  maxTokens: number
  pricing: {
    input: number
    output: number
    currency: string
  }
  capabilities: string[]
  isAvailable: boolean
}

export interface ChatSettings {
  selectedModel: string
  maxTokens: number
  temperature: number
  topP: number
  frequencyPenalty: number
  presencePenalty: number
  stopSequences: string[]
  systemPrompt: string
}

export interface AppSettings {
  theme: 'light' | 'dark' | 'system'
  language: string
  autoSave: boolean
  autoSaveInterval: number
  notifications: boolean
  sound: boolean
  shortcuts: Record<string, string>
}

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  preferences: UserPreferences
  subscription: Subscription
  createdAt: Date
  lastActive: Date
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system'
  language: string
  timezone: string
  dateFormat: string
  timeFormat: '12h' | '24h'
}

export interface Subscription {
  plan: 'free' | 'pro' | 'enterprise'
  status: 'active' | 'inactive' | 'cancelled'
  startDate: Date
  endDate?: Date
  features: string[]
  limits: Record<string, number>
}

// Dyad specific types
export type CustomTagState = 'pending' | 'finished' | 'aborted'

export interface DyadAction {
  type: 'write' | 'edit' | 'delete' | 'rename' | 'add-dependency' | 'add-integration' | 'execute-sql' | 'think' | 'codebase-context'
  path?: string
  description?: string
  content?: string
  state: CustomTagState
  metadata?: Record<string, any>
}

export interface CodeChange {
  type: 'create' | 'modify' | 'delete' | 'rename'
  path: string
  oldContent?: string
  newContent?: string
  description: string
  timestamp: Date
  author: string
}

export interface Problem {
  file: string
  line: number
  column: number
  code: string
  message: string
  severity: 'error' | 'warning' | 'info'
  snippet?: string
}

export interface Dependency {
  name: string
  version: string
  type: 'production' | 'development' | 'peer'
  description?: string
  homepage?: string
  repository?: string
  license?: string
}

export interface Integration {
  name: string
  type: 'database' | 'api' | 'service' | 'tool'
  config: Record<string, any>
  isActive: boolean
  lastSync?: Date
  metadata?: Record<string, any>
}

// UI Component types
export interface DropdownOption {
  value: string
  label: string
  icon?: string
  description?: string
  disabled?: boolean
}

export interface TabItem {
  id: string
  label: string
  icon?: string
  content: React.ReactNode
  disabled?: boolean
}

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}

export interface ToastProps {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message?: string
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}

// API Response types
export interface APIResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
  metadata?: Record<string, any>
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface StreamResponse {
  type: 'content' | 'error' | 'done'
  content?: string
  error?: string
  metadata?: Record<string, any>
}

// Event types
export interface ChatEvent {
  type: 'message' | 'typing' | 'error' | 'status'
  data: any
  timestamp: Date
  userId?: string
}

export interface EditorEvent {
  type: 'change' | 'save' | 'focus' | 'blur'
  data: any
  timestamp: Date
}

export interface FileEvent {
  type: 'upload' | 'delete' | 'rename' | 'move'
  data: any
  timestamp: Date
}

// Database types
export interface Database {
  id: string
  name: string
  type: string
  isConnected: boolean
  executeQuery: (query: string, params?: any[]) => Promise<QueryResult>
  getTables: () => Promise<string[]>
  getTableSchema: (tableName: string) => Promise<TableSchema>
  disconnect: () => Promise<void>
}

export interface DatabaseConfig {
  id: string
  name: string
  type: 'postgres' | 'mysql' | 'sqlite'
  host?: string
  port?: number
  database: string
  username?: string
  password?: string
  ssl?: boolean
  pool?: {
    min: number
    max: number
  }
  mode?: string
}

export interface QueryResult {
  success: boolean
  data: any[]
  rowsAffected: number
  error?: string
}

export interface TableSchema {
  name: string
  columns: ColumnSchema[]
}

export interface ColumnSchema {
  name: string
  type: string
  nullable: boolean
  defaultValue?: any
  primaryKey?: boolean
  foreignKey?: boolean
}

// Utility types
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>

export type OptionalFields<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never

export type ExtractProps<T> = T extends React.ComponentType<infer P> ? P : never
