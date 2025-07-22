import React from 'react'
import { Edit, Phone, Mail } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { User } from '@/types/api'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface ContactInformationSectionProps {
  employee: User
}

export function ContactInformationSection({ employee }: ContactInformationSectionProps) {
  const { t } = useTranslation()

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="flex items-center space-x-2">
          <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
            <Phone className="w-4 h-4 text-green-600 dark:text-green-400" />
          </div>
          <span>Contact Information</span>
        </CardTitle>
        <Button variant="ghost" size="sm">
          <Edit className="mr-2 h-4 w-4" />
          Edit
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Personal Contact */}
        <div>
          <h4 className="font-medium mb-3">Personal Contact</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm text-muted-foreground">Phone Number</label>
              <div className="text-sm font-medium text-blue-600">
                {employee.phoneNumber || 'Not Provided'}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm text-muted-foreground">Email</label>
              <div className="text-sm font-medium text-blue-600">
                {employee.email}
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div>
          <h4 className="font-medium mb-3">Other Contact</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm text-muted-foreground">Emergency Contact</label>
              <div className="text-sm font-medium">
                {employee.emergencyContactName || 'Not Provided'}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm text-muted-foreground">Emergency Phone</label>
              <div className="text-sm font-medium">
                {employee.emergencyContactPhone || 'Not Provided'}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm text-muted-foreground">Relationship</label>
              <div className="text-sm font-medium">
                {employee.emergencyContactRelationship || 'Not Provided'}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 