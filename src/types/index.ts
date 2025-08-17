// API Provider types
export interface APIProvider {
  id: string
  name: string
  type: ProviderType
  baseUrl: string
  apiKey: string
  isActive: boolean
  config: Record<string, any>
  createdAt: Date
  updatedAt: Date
}

export type ProviderType = 'openai' | 'anthropic' | 'google' | 'azure' | 'custom'

// API Response types
export interface APIResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// Chat types
export interface ChatMessage {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: Date
  metadata?: Record<string, any>
  attachments?: FileInfo[]
}

export interface Message {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: Date
  metadata?: Record<string, any>
  attachments?: FileInfo[]
}

export interface Conversation {
  id: string
  title: string
  messages: Message[]
  createdAt: Date
  updatedAt: Date
  metadata?: Record<string, any>
}

// Custom tag state
export type CustomTagState = "pending" | "finished" | "aborted"

// File types
export interface FileInfo {
  id: string
  name: string
  size: number
  type: string
  url?: string
  uploadedAt: Date
  metadata?: Record<string, any>
}

export interface UploadProgress {
  fileId: string
  fileName: string
  progress: number
  status: 'uploading' | 'completed' | 'error'
  error?: string
}

// Database types
export interface Database {
  id: string
  name: string
  type: 'postgresql' | 'mysql' | 'sqlite' | 'mongodb'
  host: string
  port: number
  username: string
  password: string
  database: string
  ssl: boolean
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface DatabaseConfig {
  host: string
  port: number
  username: string
  password: string
  database: string
  ssl: boolean
}

export interface QueryResult {
  success: boolean
  data?: any[]
  error?: string
  rowsAffected?: number
  executionTime?: number
}

export interface TableSchema {
  tableName: string
  columns: ColumnInfo[]
  indexes: IndexInfo[]
  foreignKeys: ForeignKeyInfo[]
}

export interface ColumnInfo {
  name: string
  type: string
  nullable: boolean
  defaultValue?: any
  isPrimary: boolean
  isUnique: boolean
}

export interface IndexInfo {
  name: string
  columns: string[]
  isUnique: boolean
}

export interface ForeignKeyInfo {
  name: string
  table: string
  columns: string[]
  referencedTable: string
  referencedColumns: string[]
}

// WebSocket event types
export interface ChatEvent {
  type: 'message' | 'typing' | 'read'
  data: any
  timestamp: Date
}

export interface EditorEvent {
  type: 'change' | 'save' | 'run' | 'error'
  data: any
  timestamp: Date
}

export interface FileEvent {
  type: 'upload' | 'delete' | 'update'
  data: any
  timestamp: Date
}

// UI Component types
export interface ButtonProps {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  disabled?: boolean
  loading?: boolean
  children: React.ReactNode
  onClick?: () => void
  className?: string
}

export interface InputProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'url'
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  disabled?: boolean
  error?: string
  className?: string
}

export interface SelectProps {
  options: { value: string; label: string; disabled?: boolean }[]
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  disabled?: boolean
  multiple?: boolean
  className?: string
}

// Hook types
export interface UseSettingsReturn {
  settings: {
    theme: 'light' | 'dark' | 'system'
    language: string
    autoSave: boolean
    apiProviders: APIProvider[]
    githubToken?: string
    databaseUrl?: string
  }
  updateSettings: (updates: Partial<UseSettingsReturn['settings']>) => void
  addAPIProvider: (provider: Omit<APIProvider, 'id' | 'createdAt' | 'updatedAt'>) => void
  removeAPIProvider: (id: string) => void
  updateAPIProvider: (id: string, updates: Partial<APIProvider>) => void
  toggleAPIProvider: (id: string) => void
}

export interface UseChatReturn {
  messages: ChatMessage[]
  sendMessage: (content: string, attachments?: FileInfo[]) => Promise<void>
  clearMessages: () => void
  isLoading: boolean
  error?: string
}

// Monaco Editor types
export interface MonacoEditorProps {
  value: string
  onChange: (value: string) => void
  language?: string
  theme?: string
  readOnly?: boolean
  height?: string | number
  options?: any
}

// Toast types
export interface Toast {
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

// Form types
export interface FormField {
  name: string
  label: string
  type: 'text' | 'email' | 'password' | 'number' | 'select' | 'textarea' | 'checkbox'
  placeholder?: string
  required?: boolean
  options?: { value: string; label: string }[]
  validation?: {
    pattern?: RegExp
    minLength?: number
    maxLength?: number
    min?: number
    max?: number
    custom?: (value: any) => string | undefined
  }
}

export interface FormData {
  [key: string]: any
}

export interface FormErrors {
  [key: string]: string
}

// Navigation types
export interface NavigationItem {
  id: string
  label: string
  icon?: React.ComponentType<any>
  href?: string
  onClick?: () => void
  children?: NavigationItem[]
  disabled?: boolean
  badge?: string | number
}

// Layout types
export interface LayoutConfig {
  sidebar: {
    width: number
    collapsed: boolean
    position: 'left' | 'right'
  }
  header: {
    height: number
    visible: boolean
  }
  footer: {
    height: number
    visible: boolean
  }
  main: {
    padding: number
    maxWidth?: number
  }
}

// Theme types
export interface Theme {
  name: string
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    surface: string
    text: string
    textSecondary: string
    border: string
    error: string
    warning: string
    success: string
    info: string
  }
  fonts: {
    body: string
    heading: string
    mono: string
  }
  spacing: {
    xs: number
    sm: number
    md: number
    lg: number
    xl: number
  }
  borderRadius: {
    sm: number
    md: number
    lg: number
    xl: number
  }
  shadows: {
    sm: string
    md: string
    lg: string
    xl: string
  }
}

// Error types
export interface AppError {
  code: string
  message: string
  details?: any
  stack?: string
  timestamp: Date
  userId?: string
  sessionId?: string
}

// Performance types
export interface PerformanceMetric {
  name: string
  value: number
  unit: string
  timestamp: Date
  metadata?: Record<string, any>
}

// Analytics types
export interface AnalyticsEvent {
  name: string
  properties?: Record<string, any>
  timestamp: Date
  userId?: string
  sessionId?: string
}

// Security types
export interface SecurityContext {
  userId?: string
  sessionId?: string
  permissions: string[]
  roles: string[]
  isAuthenticated: boolean
  isAuthorized: (permission: string) => boolean
}

// Cache types
export interface CacheEntry<T = any> {
  key: string
  value: T
  expiresAt: Date
  metadata?: Record<string, any>
}

export interface CacheConfig {
  maxSize: number
  defaultTTL: number
  cleanupInterval: number
}

// Validation types
export interface ValidationRule {
  type: 'required' | 'minLength' | 'maxLength' | 'pattern' | 'email' | 'url' | 'custom'
  value?: any
  message: string
  validator?: (value: any) => boolean | string
}

export interface ValidationResult {
  isValid: boolean
  errors: string[]
  warnings?: string[]
}

// Pagination types
export interface PaginationParams {
  page: number
  limit: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface PaginatedResult<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

// Search types
export interface SearchParams {
  query: string
  filters?: Record<string, any>
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  pagination?: PaginationParams
}

export interface SearchResult<T> {
  query: string
  results: T[]
  total: number
  facets?: Record<string, any>
  suggestions?: string[]
}

// Export types
export interface ExportOptions {
  format: 'json' | 'csv' | 'xml' | 'pdf'
  includeMetadata?: boolean
  compression?: boolean
  encoding?: string
}

// Import types
export interface ImportOptions {
  format: 'json' | 'csv' | 'xml'
  validateData?: boolean
  skipErrors?: boolean
  batchSize?: number
}

// Backup types
export interface BackupConfig {
  enabled: boolean
  schedule: string
  retention: number
  compression: boolean
  encryption: boolean
  storage: 'local' | 'cloud'
  cloudConfig?: {
    provider: 'aws' | 'gcp' | 'azure'
    bucket: string
    region: string
    credentials: Record<string, any>
  }
}

// Notification types
export interface Notification {
  id: string
  type: 'info' | 'success' | 'warning' | 'error'
  title: string
  message: string
  timestamp: Date
  read: boolean
  action?: {
    label: string
    url?: string
    onClick?: () => void
  }
  metadata?: Record<string, any>
}

// Webhook types
export interface Webhook {
  id: string
  name: string
  url: string
  events: string[]
  secret?: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface WebhookEvent {
  id: string
  webhookId: string
  event: string
  payload: any
  status: 'pending' | 'sent' | 'failed'
  attempts: number
  lastAttempt?: Date
  error?: string
  createdAt: Date
}

// API Rate Limiting types
export interface RateLimitConfig {
  enabled: boolean
  windowMs: number
  maxRequests: number
  skipSuccessfulRequests?: boolean
  skipFailedRequests?: boolean
  keyGenerator?: (req: any) => string
}

export interface RateLimitInfo {
  limit: number
  remaining: number
  reset: Date
  retryAfter?: number
}

// Logging types
export interface LogEntry {
  level: 'debug' | 'info' | 'warn' | 'error'
  message: string
  timestamp: Date
  context?: Record<string, any>
  userId?: string
  sessionId?: string
  requestId?: string
  stack?: string
}

export interface LogConfig {
  level: 'debug' | 'info' | 'warn' | 'error'
  format: 'json' | 'text' | 'simple'
  destination: 'console' | 'file' | 'remote'
  maxSize?: number
  maxFiles?: number
  compress?: boolean
}

// Metrics types
export interface Metric {
  name: string
  value: number
  unit: string
  type: 'counter' | 'gauge' | 'histogram' | 'summary'
  labels?: Record<string, string>
  timestamp: Date
  metadata?: Record<string, any>
}

export interface MetricsConfig {
  enabled: boolean
  interval: number
  prefix?: string
  labels?: Record<string, string>
  storage: 'memory' | 'prometheus' | 'custom'
}

// Health Check types
export interface HealthCheck {
  name: string
  status: 'healthy' | 'unhealthy' | 'degraded'
  message?: string
  details?: any
  timestamp: Date
  responseTime?: number
}

export interface HealthStatus {
  overall: 'healthy' | 'unhealthy' | 'degraded'
  checks: HealthCheck[]
  timestamp: Date
  version: string
  uptime: number
}

// Feature Flag types
export interface FeatureFlag {
  name: string
  enabled: boolean
  description?: string
  conditions?: Record<string, any>
  rollout?: {
    percentage: number
    users?: string[]
    groups?: string[]
  }
  createdAt: Date
  updatedAt: Date
}

// A/B Testing types
export interface ABTest {
  id: string
  name: string
  description?: string
  variants: ABVariant[]
  traffic: number
  startDate: Date
  endDate?: Date
  isActive: boolean
  goals: ABGoal[]
  createdAt: Date
  updatedAt: Date
}

export interface ABVariant {
  id: string
  name: string
  weight: number
  config: Record<string, any>
}

export interface ABGoal {
  id: string
  name: string
  type: 'conversion' | 'engagement' | 'revenue'
  metric: string
  target?: number
}

// User Feedback types
export interface Feedback {
  id: string
  userId?: string
  type: 'bug' | 'feature' | 'improvement' | 'other'
  title: string
  description: string
  priority: 'low' | 'medium' | 'high' | 'critical'
  status: 'open' | 'in-progress' | 'resolved' | 'closed'
  category?: string
  tags?: string[]
  attachments?: FileInfo[]
  createdAt: Date
  updatedAt: Date
  assignedTo?: string
  comments?: FeedbackComment[]
}

export interface FeedbackComment {
  id: string
  userId: string
  content: string
  timestamp: Date
  isInternal?: boolean
}

// Integration types
export interface Integration {
  id: string
  name: string
  type: string
  provider: string
  config: Record<string, any>
  isActive: boolean
  status: 'connected' | 'disconnected' | 'error'
  lastSync?: Date
  errorCount: number
  lastError?: string
  createdAt: Date
  updatedAt: Date
}

export interface IntegrationEvent {
  id: string
  integrationId: string
  type: string
  status: 'success' | 'error' | 'pending'
  data?: any
  error?: string
  timestamp: Date
  retryCount: number
}

// Workflow types
export interface Workflow {
  id: string
  name: string
  description?: string
  triggers: WorkflowTrigger[]
  steps: WorkflowStep[]
  isActive: boolean
  version: number
  createdAt: Date
  updatedAt: Date
}

export interface WorkflowTrigger {
  type: 'webhook' | 'schedule' | 'event' | 'manual'
  config: Record<string, any>
}

export interface WorkflowStep {
  id: string
  name: string
  type: string
  config: Record<string, any>
  dependsOn?: string[]
  retry?: {
    attempts: number
    delay: number
  }
}

export interface WorkflowExecution {
  id: string
  workflowId: string
  status: 'running' | 'completed' | 'failed' | 'cancelled'
  input: any
  output?: any
  error?: string
  startedAt: Date
  completedAt?: Date
  duration?: number
  stepResults: WorkflowStepResult[]
}

export interface WorkflowStepResult {
  stepId: string
  status: 'pending' | 'running' | 'completed' | 'failed' | 'skipped'
  input?: any
  output?: any
  error?: string
  startedAt?: Date
  completedAt?: Date
  duration?: number
  retryCount: number
}
