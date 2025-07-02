# 🏢 Organizational Hierarchy Module

## Overview

The Organizational Hierarchy module provides a comprehensive system for managing company structure through departments and teams. It supports hierarchical department structures with unlimited nesting levels and team management within departments.

## 📊 System Architecture

### Entity Relationship Diagram

```
Organization
│
└── 🏛️ Root Department (Only ONE allowed)
    ├── 👥 Employees[]
    ├── 👔 Manager
    ├── 💰 Budget
    ├── 📍 Location
    │
    ├── 🏢 Child Department 1
    │   ├── 👥 Employees[]
    │   ├── 👔 Manager
    │   ├── 🎯 Team 1
    │   │   ├── 👨‍💼 Team Lead
    │   │   └── 👥 Members[]
    │   └── 🎯 Team 2
    │
    └── 🏢 Child Department 2
        ├── 👥 Employees[]
        ├── 👔 Manager
        └── 🎯 Teams[]
```

## 🏗️ Data Models

### Department Entity

```typescript
Department {
  id: string                    // Auto-generated ObjectId
  name: string                  // Required, 2-100 characters, unique
  description?: string          // Optional, max 500 characters
  manager?: ObjectId           // Reference to User entity
  parentDepartment?: ObjectId  // Reference to parent Department
  employees: ObjectId[]        // Array of User references
  budget?: number             // Optional, minimum 0
  location?: string           // Optional, max 200 characters
  status: DepartmentStatus    // ACTIVE | INACTIVE | ARCHIVED
  createdBy: ObjectId         // Required, User who created
  createdAt: Date            // Auto-generated
  updatedAt: Date            // Auto-updated
  deletedAt?: Date           // Soft delete timestamp
}
```

### Team Entity

```typescript
Team {
  id: string                  // Auto-generated ObjectId
  name: string               // Required, 2-100 characters
  description?: string       // Optional, max 500 characters
  department: ObjectId       // Required, belongs to Department
  teamLead?: ObjectId       // Reference to User entity
  members: ObjectId[]       // Array of User references
  status: TeamStatus        // ACTIVE | INACTIVE | ARCHIVED
  createdBy: ObjectId       // Required, User who created
  createdAt: Date          // Auto-generated
  updatedAt: Date          // Auto-updated
  deletedAt?: Date         // Soft delete timestamp
}
```

## 🔧 Business Rules

### Department Rules

1. **Root Department Constraint**: Only ONE root department allowed per organization
2. **Name Uniqueness**: Department names must be unique across the organization
3. **Circular Reference Prevention**: A department cannot be its own parent
4. **Manager Validation**: Manager must be an existing user
5. **Parent Validation**: Parent department must exist
6. **Deletion Rules**:
   - Cannot delete department with child departments
   - Cannot delete department with active teams
   - Uses soft delete (sets `deletedAt` timestamp)

### Team Rules

1. **Department Scoping**: Team names must be unique within their department
2. **Department Association**: Each team must belong to an existing department
3. **Team Lead Validation**: Team lead must be an existing user
4. **Member Management**: Team members must be existing users
5. **Duplicate Prevention**: Users cannot be added as members twice

## 🌐 API Endpoints

### Department Management

#### Create Department

```http
POST /api/organization/departments
Content-Type: application/json

{
  "name": "Engineering",
  "description": "Software development department",
  "manager": "user_id_here",
  "parentDepartment": "parent_dept_id", // Optional for root department
  "budget": 100000,
  "location": "Ha Noi, Vietnam",
  "status": "active"
}
```

#### Get All Departments (Paginated)

```http
GET /api/organization/departments?page=1&limit=10&search=eng&status=active
```

#### Get Department by ID

```http
GET /api/organization/departments/{id}
```

#### Update Department

```http
PUT /api/organization/departments/{id}
Content-Type: application/json

{
  "name": "Updated Engineering",
  "description": "Updated description",
  "manager": "new_manager_id"
}
```

#### Delete Department

```http
DELETE /api/organization/departments/{id}
```

#### Get Department Hierarchy

```http
GET /api/organization/departments/hierarchy
```

**Response Example:**

```json
[
  {
    "id": "root_dept_id",
    "name": "ABC Company",
    "description": "Root department",
    "manager": "ceo_user_id",
    "managerName": "John CEO",
    "employeeCount": 5,
    "teamCount": 0,
    "status": "active",
    "children": [
      {
        "id": "eng_dept_id",
        "name": "Engineering",
        "description": "Software development",
        "manager": "eng_manager_id",
        "managerName": "Jane Smith",
        "employeeCount": 15,
        "teamCount": 3,
        "status": "active",
        "children": []
      }
    ]
  }
]
```

### Team Management

#### Create Team

```http
POST /api/organization/teams
Content-Type: application/json

{
  "name": "Frontend Team",
  "description": "Frontend development team",
  "department": "department_id",
  "teamLead": "user_id"
}
```

#### Get Team by ID

```http
GET /api/organization/teams/{id}
```

#### Get Teams by Department

```http
GET /api/organization/teams/department/{departmentId}
```

#### Update Team

```http
PUT /api/organization/teams/{id}
Content-Type: application/json

{
  "name": "Updated Frontend Team",
  "teamLead": "new_lead_id"
}
```

#### Delete Team

```http
DELETE /api/organization/teams/{id}
```

#### Add Team Member

```http
POST /api/organization/teams/{teamId}/members/{userId}
```

#### Remove Team Member

```http
DELETE /api/organization/teams/{teamId}/members/{userId}
```

## ⚠️ Error Codes

| Code | Message                                        | Description                                |
| ---- | ---------------------------------------------- | ------------------------------------------ |
| D001 | `department.error.name_exists`                 | Department name already exists             |
| D002 | `department.error.manager_not_found`           | Manager user not found                     |
| D003 | `department.error.parent_department_not_found` | Parent department not found                |
| D004 | `department.error.self_reference`              | Department cannot be its own parent        |
| D005 | `department.error.has_child_departments`       | Cannot delete department with children     |
| D006 | `department.error.has_active_teams`            | Cannot delete department with active teams |
| D007 | `department.error.not_found`                   | Department not found                       |
| D008 | `department.error.root_department_exists`      | Root department already exists             |
| T001 | `team.error.name_exists`                       | Team name exists in department             |
| T002 | `team.error.team_lead_not_found`               | Team lead user not found                   |
| T003 | `team.error.department_not_found`              | Department not found                       |
| T004 | `team.error.not_found`                         | Team not found                             |
| T005 | `team.error.has_members`                       | User already a team member                 |

## 📝 Usage Examples

### Creating Organizational Structure

1. **Create Root Department**

```typescript
// First, create the root department
const rootDept = await organizationService.createDepartment(
  {
    name: "ABC Corporation",
    description: "Main company department",
    manager: "ceo_user_id",
    // No parentDepartment for root
  },
  createdByUserId,
);
```

2. **Create Child Departments**

```typescript
// Create Engineering department under root
const engDept = await organizationService.createDepartment(
  {
    name: "Engineering",
    description: "Software development",
    parentDepartment: rootDept.id,
    manager: "eng_manager_id",
    budget: 500000,
    location: "Ha Noi",
  },
  createdByUserId,
);

// Create Sales department under root
const salesDept = await organizationService.createDepartment(
  {
    name: "Sales",
    description: "Sales and marketing",
    parentDepartment: rootDept.id,
    manager: "sales_manager_id",
  },
  createdByUserId,
);
```

3. **Create Teams**

```typescript
// Create Frontend team in Engineering
const frontendTeam = await organizationService.createTeam(
  {
    name: "Frontend Team",
    description: "Frontend development",
    department: engDept.id,
    teamLead: "frontend_lead_id",
  },
  createdByUserId,
);

// Create Backend team in Engineering
const backendTeam = await organizationService.createTeam(
  {
    name: "Backend Team",
    description: "Backend development",
    department: engDept.id,
    teamLead: "backend_lead_id",
  },
  createdByUserId,
);
```

### Querying Hierarchy

```typescript
// Get complete organizational hierarchy
const hierarchy = await organizationService.getDepartmentHierarchy();

// Get specific department with teams
const department = await organizationService.findDepartmentById(deptId);
const teams = await organizationService.findTeamsByDepartment(deptId);

// Get paginated departments
const departments = await organizationService.findAllDepartments({
  page: 1,
  limit: 10,
  search: "eng",
  status: DepartmentStatus.ACTIVE,
});
```

### Team Member Management

```typescript
// Add member to team
await organizationService.addTeamMember(teamId, userId);

// Remove member from team
await organizationService.removeTeamMember(teamId, userId);

// Get team details with members
const team = await organizationService.findTeamById(teamId);
```

## 🔍 Database Indexes

### Department Indexes

- `name`: For unique name lookups
- `manager`: For manager queries
- `parentDepartment`: For hierarchy queries
- `status`: For status filtering
- `createdBy`: For audit trails
- `createdAt`: For sorting

### Team Indexes

- `name`: For name searches
- `department`: For department-scoped queries
- `teamLead`: For team lead lookups
- `status`: For status filtering
- `createdBy`: For audit trails
- `createdAt`: For sorting

## 🔄 Migration Considerations

When implementing this system:

1. **Start with Root Department**: Always create the root department first
2. **Validate Existing Data**: Ensure no circular references in existing data
3. **Handle Orphaned Records**: Address departments without valid parents
4. **Preserve Relationships**: Maintain user-department-team associations
5. **Soft Delete Strategy**: Use `deletedAt` timestamps for data integrity

## 📊 Performance Optimization

1. **Eager Loading**: Load manager names and counts in hierarchy queries
2. **Caching**: Cache department hierarchy for better performance
3. **Pagination**: Use cursor-based pagination for large datasets
4. **Indexing**: Leverage MongoDB indexes for fast queries
5. **Aggregation**: Use MongoDB aggregation pipelines for complex queries

## 🔐 Security Considerations

1. **Authorization**: Verify user permissions before operations
2. **Input Validation**: Validate all input data
3. **Audit Logging**: Track all organizational changes
4. **Data Isolation**: Ensure departments/teams are organization-scoped
5. **Soft Delete**: Preserve data integrity with soft deletes
