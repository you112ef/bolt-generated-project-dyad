import React, { useState } from 'react'
import { ChevronsDownUp, ChevronsUpDown, Pencil, Loader, CircleX } from 'lucide-react'
import { CodeHighlight } from '../CodeHighlight'
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
      className={`bg-background-lightest hover:bg-background-lighter rounded-lg px-4 py-2 border my-2 cursor-pointer transition-all duration-200 ${
        inProgress
          ? "border-amber-500 bg-amber-50 dark:bg-amber-950/20"
          : aborted
            ? "border-red-500 bg-red-50 dark:bg-red-950/20"
            : "border-border hover:border-primary/50"
      }`}
      onClick={() => setIsContentVisible(!isContentVisible)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Pencil size={16} className="text-blue-500" />
          <span className="text-foreground font-medium text-sm">
            {fileName && (
              <span className="font-bold mr-2 outline-2 outline-gray-200 dark:outline-gray-700 bg-gray-100 dark:bg-gray-800 rounded-md px-1">
                {fileName}
              </span>
            )}
            {description}
          </span>
          <div className="text-xs text-blue-500 font-medium">Write</div>
        </div>
        
        <div className="flex items-center gap-2">
          {inProgress && (
            <Loader size={14} className="text-amber-500 animate-spin" />
          )}
          {aborted && (
            <CircleX size={14} className="text-red-500" />
          )}
          {isContentVisible ? (
            <ChevronsDownUp size={16} className="text-muted-foreground" />
          ) : (
            <ChevronsUpDown size={16} className="text-muted-foreground" />
          )}
        </div>
      </div>
      
      {path && (
        <div className="text-xs text-muted-foreground font-medium mb-1 mt-1">
          {path}
        </div>
      )}
      
      {isContentVisible && children && (
        <div className="mt-3 pt-3 border-t border-border">
          <CodeHighlight>{children}</CodeHighlight>
        </div>
      )}
    </div>
  )
}
