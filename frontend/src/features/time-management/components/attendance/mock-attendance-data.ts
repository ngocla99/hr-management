import { AttendanceResDto } from '@/types/api'
import { AttendanceStatus } from '@/types/api'

// Helper function to create dates
const createDate = (date: string, time: string) => {
  return new Date(`${date}T${time}:00.000Z`)
}

// Helper function to create attendance record
const createAttendance = (
  id: string,
  userId: string,
  date: string,
  clockIn: string,
  clockOut?: string,
  breakStart?: string,
  breakEnd?: string,
  overtimeStart?: string,
  overtimeEnd?: string,
  isLate = false,
  isEarlyLeave = false,
  notes?: string
): AttendanceResDto => {
  const clockInTime = createDate(date, clockIn)
  const clockOutTime = clockOut ? createDate(date, clockOut) : undefined
  const breakStartTime = breakStart ? createDate(date, breakStart) : undefined
  const breakEndTime = breakEnd ? createDate(date, breakEnd) : undefined
  const overtimeStartTime = overtimeStart ? createDate(date, overtimeStart) : undefined
  const overtimeEndTime = overtimeEnd ? createDate(date, overtimeEnd) : undefined

  // Calculate work hours
  let totalWorkHours = 0
  let netWorkHours = 0
  let totalBreakHours = 0
  let totalOvertimeHours = 0

  if (clockInTime && clockOutTime) {
    totalWorkHours = (clockOutTime.getTime() - clockInTime.getTime()) / (1000 * 60 * 60)
    
    if (breakStartTime && breakEndTime) {
      totalBreakHours = (breakEndTime.getTime() - breakStartTime.getTime()) / (1000 * 60 * 60)
      netWorkHours = totalWorkHours - totalBreakHours
    } else {
      totalBreakHours = 1.0 // Default break
      netWorkHours = totalWorkHours - totalBreakHours
    }

    if (overtimeStartTime && overtimeEndTime) {
      totalOvertimeHours = (overtimeEndTime.getTime() - overtimeStartTime.getTime()) / (1000 * 60 * 60)
    }
  }

  return {
    id,
    userId,
    date: createDate(date, '00:00'),
    clockInTime,
    clockOutTime,
    breakStartTime,
    breakEndTime,
    overtimeStartTime,
    overtimeEndTime,
    status: isLate ? AttendanceStatus.LATE : AttendanceStatus.PRESENT,
    totalWorkHours,
    netWorkHours,
    totalBreakHours,
    totalOvertimeHours,
    notes,
    isLate,
    isEarlyLeave,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
}

export const mockAttendanceData: AttendanceResDto[] = [
  // Today - Normal day with overtime
  createAttendance(
    'att-001',
    'user-123',
    '2024-01-15',
    '09:00',
    '18:00',
    '12:00',
    '13:00',
    '18:00',
    '20:00',
    false,
    false,
    'Working on project deadline'
  ),

  // Yesterday - Late arrival
  createAttendance(
    'att-002',
    'user-123',
    '2024-01-14',
    '09:30',
    '18:00',
    '12:00',
    '13:00',
    undefined,
    undefined,
    true,
    false,
    'Traffic delay'
  ),

  // 2 days ago - Early leave
  createAttendance(
    'att-003',
    'user-123',
    '2024-01-13',
    '09:00',
    '16:00',
    '12:00',
    '13:00',
    undefined,
    undefined,
    false,
    true,
    'Doctor appointment'
  ),

  // 3 days ago - Normal day
  createAttendance(
    'att-004',
    'user-123',
    '2024-01-12',
    '08:45',
    '17:30',
    '12:00',
    '13:00',
    undefined,
    undefined,
    false,
    false,
    'Regular work day'
  ),

  // 4 days ago - No clock out (incomplete)
  createAttendance(
    'att-005',
    'user-123',
    '2024-01-11',
    '09:00',
    undefined,
    '12:00',
    '13:00',
    undefined,
    undefined,
    false,
    false,
    'Forgot to clock out'
  ),

  // 5 days ago - Long overtime
  createAttendance(
    'att-006',
    'user-123',
    '2024-01-10',
    '08:30',
    '19:00',
    '12:00',
    '13:00',
    '19:00',
    '22:00',
    false,
    false,
    'Critical system maintenance'
  ),

  // 6 days ago - Late with overtime
  createAttendance(
    'att-007',
    'user-123',
    '2024-01-09',
    '09:45',
    '18:00',
    '12:00',
    '13:00',
    '18:00',
    '21:00',
    true,
    false,
    'Late but worked overtime'
  ),

  // 7 days ago - Perfect attendance
  createAttendance(
    'att-008',
    'user-123',
    '2024-01-08',
    '08:55',
    '17:05',
    '12:00',
    '13:00',
    undefined,
    undefined,
    false,
    false,
    'On time, left on time'
  ),

  // 8 days ago - Short break
  createAttendance(
    'att-009',
    'user-123',
    '2024-01-07',
    '09:00',
    '18:00',
    '12:00',
    '12:30',
    undefined,
    undefined,
    false,
    false,
    'Short lunch break'
  ),

  // 9 days ago - Very late
  createAttendance(
    'att-010',
    'user-123',
    '2024-01-06',
    '10:30',
    '18:00',
    '12:00',
    '13:00',
    undefined,
    undefined,
    true,
    false,
    'Overslept'
  ),

  // 10 days ago - Weekend overtime
  createAttendance(
    'att-011',
    'user-123',
    '2024-01-05',
    '10:00',
    '16:00',
    '13:00',
    '14:00',
    '16:00',
    '18:00',
    false,
    false,
    'Weekend project work'
  ),

  // 11 days ago - Half day
  createAttendance(
    'att-012',
    'user-123',
    '2024-01-04',
    '09:00',
    '13:00',
    undefined,
    undefined,
    undefined,
    undefined,
    false,
    true,
    'Half day - personal leave'
  ),

  // 12 days ago - Multiple breaks
  createAttendance(
    'att-013',
    'user-123',
    '2024-01-03',
    '09:00',
    '18:00',
    '11:00',
    '12:00',
    undefined,
    undefined,
    false,
    false,
    'Long lunch break'
  ),

  // 13 days ago - Early start
  createAttendance(
    'att-014',
    'user-123',
    '2024-01-02',
    '07:30',
    '16:30',
    '12:00',
    '13:00',
    undefined,
    undefined,
    false,
    false,
    'Early start for meeting'
  ),

  // 14 days ago - Late with no overtime
  createAttendance(
    'att-015',
    'user-123',
    '2024-01-01',
    '09:15',
    '18:00',
    '12:00',
    '13:00',
    undefined,
    undefined,
    true,
    false,
    'Late but stayed full day'
  ),
]

export const mockAttendanceResponse = {
  data: mockAttendanceData,
  cursor: {
    afterCursor: 'att-015',
    beforeCursor: 'att-001',
  },
} 