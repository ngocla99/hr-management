import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { AvatarGroup } from '@/components/ui/avatar-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useCalendar } from '@/components/calendar/contexts/calendar-context'

export function UserSelect() {
  const { users, selectedUserId, setSelectedUserId } = useCalendar()

  return (
    <Select value={selectedUserId} onValueChange={setSelectedUserId}>
      <SelectTrigger className='flex-1 md:w-48'>
        <SelectValue />
      </SelectTrigger>

      <SelectContent align='end'>
        <SelectItem value='all'>
          <div className='flex items-center gap-1'>
            <AvatarGroup max={2}>
              {users.map((user) => (
                <Avatar key={user.id} className='text-xxs size-6'>
                  <AvatarImage
                    src={user.picturePath ?? undefined}
                    alt={user.name}
                  />
                  <AvatarFallback className='text-xxs'>
                    {user.name[0]}
                  </AvatarFallback>
                </Avatar>
              ))}
            </AvatarGroup>
            All
          </div>
        </SelectItem>

        {users.map((user) => (
          <SelectItem key={user.id} value={user.id} className='flex-1'>
            <div className='flex items-center gap-2'>
              <Avatar key={user.id} className='size-6'>
                <AvatarImage
                  src={user.picturePath ?? undefined}
                  alt={user.name}
                />
                <AvatarFallback className='text-xxs'>
                  {user.name[0]}
                </AvatarFallback>
              </Avatar>

              <p className='truncate'>{user.name}</p>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
