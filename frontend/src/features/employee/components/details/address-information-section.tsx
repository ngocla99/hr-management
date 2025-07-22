import React from 'react'
import { Edit, MapPin, ExternalLink } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { User } from '@/types/api'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface AddressInformationSectionProps {
  employee: User
}

export function AddressInformationSection({ employee }: AddressInformationSectionProps) {
  const { t } = useTranslation()

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="flex items-center space-x-2">
          <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
            <MapPin className="w-4 h-4 text-orange-600 dark:text-orange-400" />
          </div>
          <span>Address Information</span>
        </CardTitle>
        <Button variant="ghost" size="sm">
          <Edit className="mr-2 h-4 w-4" />
          Edit
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Residential Address */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium text-muted-foreground">Residential Address</label>
            <Button variant="link" size="sm" className="h-auto p-0 text-xs">
              View on Map
              <ExternalLink className="ml-1 h-3 w-3" />
            </Button>
          </div>
          <div className="text-sm font-medium mb-2">
            {employee.residentialAddress || 'Not Provided'}
          </div>
          {employee.residentialAddressNotes && (
            <div>
              <label className="text-sm text-muted-foreground">Notes</label>
              <div className="text-sm mt-1">
                {employee.residentialAddressNotes}
              </div>
            </div>
          )}
        </div>

        {/* Citizen ID Address */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium text-muted-foreground">Citizen ID Address</label>
            <Button variant="link" size="sm" className="h-auto p-0 text-xs">
              View on Map
              <ExternalLink className="ml-1 h-3 w-3" />
            </Button>
          </div>
          <div className="text-sm font-medium mb-2">
            {employee.citizenIdAddress || 'Not Provided'}
          </div>
          {employee.citizenIdAddressNotes && (
            <div>
              <label className="text-sm text-muted-foreground">Notes</label>
              <div className="text-sm mt-1 p-3 bg-muted/50 rounded-md">
                {employee.citizenIdAddressNotes}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
} 