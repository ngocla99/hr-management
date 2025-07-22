import React, { useState } from 'react'
import { Hash, Plus, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { User } from '@/types/api'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

interface TagsSectionProps {
  employee: User
}

export function TagsSection({ employee }: TagsSectionProps) {
  const { t } = useTranslation()
  const [newTag, setNewTag] = useState('')
  const [isAdding, setIsAdding] = useState(false)
  const [tags, setTags] = useState<string[]>(employee.tags || [])

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag('')
      setIsAdding(false)
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddTag()
    } else if (e.key === 'Escape') {
      setIsAdding(false)
      setNewTag('')
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="flex items-center space-x-2">
          <div className="p-2 bg-pink-100 dark:bg-pink-900 rounded-lg">
            <Hash className="w-4 h-4 text-pink-600 dark:text-pink-400" />
          </div>
          <span>Tags</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Existing Tags */}
        <div className="space-y-3">
          {tags.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="flex items-center gap-1 px-2 py-1"
                >
                  {tag}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0 hover:bg-destructive hover:text-destructive-foreground"
                    onClick={() => handleRemoveTag(tag)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No tags assigned</p>
          )}
        </div>

        {/* Add New Tag */}
        <div className="space-y-2">
          {isAdding ? (
            <div className="flex gap-2">
              <Input
                placeholder="Add tag to candidate"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={handleKeyPress}
                className="text-sm"
                autoFocus
              />
              <Button size="sm" onClick={handleAddTag} disabled={!newTag.trim()}>
                Add
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  setIsAdding(false)
                  setNewTag('')
                }}
              >
                Cancel
              </Button>
            </div>
          ) : (
            <Button
              variant="link"
              size="sm"
              className="h-auto p-0 text-sm text-muted-foreground"
              onClick={() => setIsAdding(true)}
            >
              <Plus className="mr-1 h-3 w-3" />
              Add tag to candidate
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
} 