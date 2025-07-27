import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Employee } from '@/features/employee/type/employee'
import { Hash } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

interface TagsProps {
  employee: Employee
}

export function Tags({ employee }: TagsProps) {
  const { t } = useTranslation()
  const [newTag, setNewTag] = useState('')

  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0'>
        <CardTitle className='flex items-center space-x-2'>
          <Hash className='text-muted-foreground size-5' />
          <span className='font-bold'>
            {t('page.tags', { ns: 'employee' })}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        <Textarea
          placeholder={t('actions.addTag', { ns: 'employee' })}
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          className='h-24'
        />
      </CardContent>
    </Card>
  )
}
