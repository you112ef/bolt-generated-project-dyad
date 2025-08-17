import { useState } from 'react'
import { ChevronsDownUp, ChevronsUpDown, Pencil, Loader, Circle } from 'lucide-react'
import { CodeHighlight } from '../chat/CodeHighlight'
import { CustomTagState } from '../../types'

interface DyadWriteProps {
  children?: React.ReactNode
  node?: any
  path?: string
  description?: string
}

export const DyadWrite: React.FC<DyadWriteProps> = ({
  children,
  node,
  path: pathProp,
  description: descriptionProp,
}) => {
  const [isContentVisible, setIsContentVisible] = useState(false)

  const path = pathProp || node?.properties?.path || ""
  const description = descriptionProp || node?.properties?.description || ""
  const state = node?.properties?.state as CustomTagState
  const inProgress = state === "pending"
  const aborted = state === "aborted"

  const fileName = path ? path.split("/").pop() : ""

  return (
    <div
      className={`bg-(--background-lightest) hover:bg-(--background-lighter) rounded-lg px-4 py-2 border my-2 cursor-pointer ${
        inProgress ? 'border-amber-500' : aborted ? 'border-red-500' : ''
      }`}
      style={!inProgress && !aborted ? { borderColor: 'hsl(var(--border))' } : undefined}
      onClick={() => setIsContentVisible(!isContentVisible)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Pencil className="w-4 h-4" />
          <span className="text-sm font-medium">Write</span>
          {path && (
            <span className="text-xs text-muted-foreground">{path}</span>
          )}
        </div>
        <div>
          {isContentVisible ? (
            <ChevronsUpDown className="w-4 h-4" />
          ) : (
            <ChevronsDownUp className="w-4 h-4" />
          )}
        </div>
      </div>

      {description && (
        <div className="mt-1 text-sm text-muted-foreground">{description}</div>
      )}

      {isContentVisible && (
        <div className="mt-3">
          {children}
        </div>
      )}

      {inProgress && (
        <div className="mt-2 flex items-center text-amber-600 text-sm">
          <Loader className="w-4 h-4 mr-2 animate-spin" />
          In progress
        </div>
      )}
      {aborted && (
        <div className="mt-2 flex items-center text-red-600 text-sm">
          <Circle className="w-3 h-3 mr-2" />
          Aborted
        </div>
      )}
    </div>
  )
}
