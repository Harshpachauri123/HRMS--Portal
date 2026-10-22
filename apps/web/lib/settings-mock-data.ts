export type SettingsRole = "Super Admin" | "HR" | "User"

export type SettingsUser = {
  id: string
  name: string
  email: string
  department: string
  designation: string
  roles: SettingsRole[]
  status: "Active" | "Inactive" | "Suspended"
}

export type SettingsSession = {
  id: string
  device: string
  browser: string
  location: string
  lastActive: string
  current: boolean
}

export type SettingsAuditLog = {
  id: string
  timestamp: string
  user: string
  action: string
  module: string
  description: string
}

export const SETTINGS_ROLES: SettingsRole[] = ["Super Admin", "HR", "User"]

export const MOCK_PROFILE = {
  name: "Aarav Mehta",
  email: "aarav.mehta@sdvedutech.com",
  department: "Human Resources",
  designation: "HR Administrator",
  role: "Super Admin" as SettingsRole,
  employeeId: "SDV-001",
}

export const MOCK_USERS: SettingsUser[] = [
  {
    id: "usr-001",
    name: "Aarav Mehta",
    email: "aarav.mehta@sdvedutech.com",
    department: "Human Resources",
    designation: "HR Administrator",
    roles: ["Super Admin"],
    status: "Active",
  },
  {
    id: "usr-002",
    name: "Isha Nair",
    email: "isha.nair@sdvedutech.com",
    department: "Human Resources",
    designation: "HR Manager",
    roles: ["HR"],
    status: "Active",
  },
  {
    id: "usr-003",
    name: "Kabir Sharma",
    email: "kabir.sharma@sdvedutech.com",
    department: "Engineering",
    designation: "Software Engineer",
    roles: ["User"],
    status: "Active",
  },
  {
    id: "usr-004",
    name: "Meera Iyer",
    email: "meera.iyer@sdvedutech.com",
    department: "Finance",
    designation: "Payroll Executive",
    roles: ["HR"],
    status: "Active",
  },
  {
    id: "usr-005",
    name: "Riya Sen",
    email: "riya.sen@sdvedutech.com",
    department: "Sales",
    designation: "Sales Associate",
    roles: ["User"],
    status: "Inactive",
  },
  {
    id: "usr-006",
    name: "Vihaan Kapoor",
    email: "vihaan.kapoor@sdvedutech.com",
    department: "Engineering",
    designation: "Product Designer",
    roles: ["User"],
    status: "Active",
  },
  {
    id: "usr-007",
    name: "Ananya Das",
    email: "ananya.das@sdvedutech.com",
    department: "Operations",
    designation: "Operations Lead",
    roles: ["HR"],
    status: "Active",
  },
  {
    id: "usr-008",
    name: "Reyansh Malhotra",
    email: "reyansh.malhotra@sdvedutech.com",
    department: "Marketing",
    designation: "Marketing Executive",
    roles: ["User"],
    status: "Active",
  },
  {
    id: "usr-009",
    name: "Sara George",
    email: "sara.george@sdvedutech.com",
    department: "Human Resources",
    designation: "Recruiter",
    roles: ["HR"],
    status: "Inactive",
  },
  {
    id: "usr-010",
    name: "Arjun Patel",
    email: "arjun.patel@sdvedutech.com",
    department: "Engineering",
    designation: "QA Analyst",
    roles: ["User"],
    status: "Active",
  },
  {
    id: "usr-011",
    name: "Tara Bose",
    email: "tara.bose@sdvedutech.com",
    department: "Finance",
    designation: "Accountant",
    roles: ["User"],
    status: "Active",
  },
  {
    id: "usr-012",
    name: "Dev Khanna",
    email: "dev.khanna@sdvedutech.com",
    department: "Human Resources",
    designation: "People Operations",
    roles: ["HR"],
    status: "Active",
  },
]

export const MOCK_SESSIONS: SettingsSession[] = [
  {
    id: "ses-current",
    device: "Windows desktop",
    browser: "Chrome on Windows",
    location: "Agra, India",
    lastActive: "Just now",
    current: true,
  },
  {
    id: "ses-mobile",
    device: "iPhone 15",
    browser: "Safari on iOS",
    location: "Agra, India",
    lastActive: "Today, 10:42 AM",
    current: false,
  },
  {
    id: "ses-office",
    device: "MacBook Pro",
    browser: "Chrome on macOS",
    location: "Delhi, India",
    lastActive: "Yesterday, 6:18 PM",
    current: false,
  },
]

export const MOCK_AUDIT_LOGS: SettingsAuditLog[] = [
  {
    id: "log-001",
    timestamp: "2026-10-21T10:32:00+05:30",
    user: "Aarav Mehta",
    action: "Updated",
    module: "Staff",
    description: "Updated employee profile for Kabir Sharma.",
  },
  {
    id: "log-002",
    timestamp: "2026-10-21T09:54:00+05:30",
    user: "Isha Nair",
    action: "Added",
    module: "Candidates",
    description: "Added a candidate profile for the Engineering department.",
  },
  {
    id: "log-003",
    timestamp: "2026-10-20T17:10:00+05:30",
    user: "Meera Iyer",
    action: "Updated",
    module: "Attendance",
    description: "Reviewed attendance records for the current pay period.",
  },
  {
    id: "log-004",
    timestamp: "2026-10-20T15:46:00+05:30",
    user: "Aarav Mehta",
    action: "Deactivated",
    module: "Users",
    description: "Changed the status of a staff account to inactive.",
  },
  {
    id: "log-005",
    timestamp: "2026-10-20T12:20:00+05:30",
    user: "Ananya Das",
    action: "Added",
    module: "Staff",
    description: "Created a new staff profile in Operations.",
  },
  {
    id: "log-006",
    timestamp: "2026-10-19T16:02:00+05:30",
    user: "Isha Nair",
    action: "Updated",
    module: "Candidates",
    description: "Updated candidate contact details.",
  },
  {
    id: "log-007",
    timestamp: "2026-10-19T11:35:00+05:30",
    user: "Aarav Mehta",
    action: "Signed in",
    module: "Profile",
    description: "Signed in from Chrome on Windows.",
  },
  {
    id: "log-008",
    timestamp: "2026-10-18T14:12:00+05:30",
    user: "Dev Khanna",
    action: "Updated",
    module: "Attendance",
    description: "Reviewed an attendance adjustment request.",
  },
  {
    id: "log-009",
    timestamp: "2026-10-17T09:08:00+05:30",
    user: "Sara George",
    action: "Added",
    module: "Candidates",
    description: "Added a candidate profile for the Sales department.",
  },
  {
    id: "log-010",
    timestamp: "2026-10-16T18:24:00+05:30",
    user: "Aarav Mehta",
    action: "Updated",
    module: "Users",
    description:
      "Updated department and designation details for a staff account.",
  },
]
