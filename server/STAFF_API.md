# Staff Management API

This document describes the Staff Management API endpoints for the hospital management system.

## Overview

The Staff Management API provides CRUD operations for managing hospital staff members including doctors, nurses, administrators, technicians, receptionists, and other personnel. The API supports role-based categorization, schedule/availability tracking, and advanced search/filter capabilities.

## Base URL

All API endpoints are prefixed with `/api/staff`

## Data Model

### Staff Object

```json
{
  "_id": "string",
  "firstName": "string",
  "lastName": "string",
  "role": "Doctor | Nurse | Administrator | Technician | Receptionist | Other",
  "department": "Emergency | Cardiology | Pediatrics | Surgery | Radiology | Administration | Other",
  "specialization": "string (optional)",
  "qualifications": ["string"],
  "email": "string (unique)",
  "phoneNumber": "string",
  "address": "string (optional)",
  "employmentDate": "Date",
  "employmentStatus": "active | inactive | on-leave",
  "availability": {
    "monday": { "available": boolean, "hours": "string" },
    "tuesday": { "available": boolean, "hours": "string" },
    "wednesday": { "available": boolean, "hours": "string" },
    "thursday": { "available": boolean, "hours": "string" },
    "friday": { "available": boolean, "hours": "string" },
    "saturday": { "available": boolean, "hours": "string" },
    "sunday": { "available": boolean, "hours": "string" }
  },
  "emergencyContact": {
    "name": "string",
    "relationship": "string",
    "phoneNumber": "string"
  },
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

## API Endpoints

### 1. Create Staff Member

Create a new staff member.

**Endpoint:** `POST /api/staff`

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "role": "Doctor",
  "department": "Emergency",
  "specialization": "Emergency Medicine",
  "qualifications": ["MD", "Board Certified"],
  "email": "john.doe@hospital.com",
  "phoneNumber": "+1-555-0123",
  "address": "123 Medical St, City, State 12345",
  "employmentStatus": "active",
  "availability": {
    "monday": { "available": true, "hours": "9:00 AM - 5:00 PM" },
    "tuesday": { "available": true, "hours": "9:00 AM - 5:00 PM" },
    "wednesday": { "available": true, "hours": "9:00 AM - 5:00 PM" },
    "thursday": { "available": true, "hours": "9:00 AM - 5:00 PM" },
    "friday": { "available": true, "hours": "9:00 AM - 5:00 PM" },
    "saturday": { "available": false, "hours": "" },
    "sunday": { "available": false, "hours": "" }
  },
  "emergencyContact": {
    "name": "Jane Doe",
    "relationship": "Spouse",
    "phoneNumber": "+1-555-0124"
  }
}
```

**Success Response (201 Created):**
```json
{
  "success": true,
  "message": "Staff member created successfully",
  "data": { /* Staff object */ }
}
```

**Error Responses:**
- `400 Bad Request` - Validation error
- `409 Conflict` - Duplicate email
- `500 Internal Server Error` - Server error

---

### 2. Get All Staff Members

Retrieve all staff members with optional filtering.

**Endpoint:** `GET /api/staff`

**Query Parameters:**
- `role` (optional): Filter by role (e.g., `Doctor`, `Nurse`)
- `department` (optional): Filter by department (e.g., `Emergency`, `Cardiology`)
- `status` (optional): Filter by employment status (e.g., `active`, `inactive`, `on-leave`)
- `available` (optional): Filter by current availability (e.g., `true`)
- `search` (optional): Search by first name or last name (case-insensitive)

**Examples:**
```bash
GET /api/staff
GET /api/staff?role=Doctor
GET /api/staff?department=Emergency
GET /api/staff?status=active
GET /api/staff?available=true
GET /api/staff?search=John
GET /api/staff?role=Doctor&department=Emergency&status=active
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "count": 5,
  "data": [ /* Array of Staff objects */ ]
}
```

**Error Response:**
- `500 Internal Server Error` - Server error

---

### 3. Get Single Staff Member

Retrieve a specific staff member by ID.

**Endpoint:** `GET /api/staff/:id`

**Parameters:**
- `id` - Staff member's MongoDB ObjectId

**Success Response (200 OK):**
```json
{
  "success": true,
  "data": { /* Staff object */ }
}
```

**Error Responses:**
- `400 Bad Request` - Invalid ID format
- `404 Not Found` - Staff member not found
- `500 Internal Server Error` - Server error

---

### 4. Update Staff Member

Update an existing staff member's information.

**Endpoint:** `PUT /api/staff/:id`

**Parameters:**
- `id` - Staff member's MongoDB ObjectId

**Request Body:**
```json
{
  "specialization": "Trauma Surgery",
  "phoneNumber": "+1-555-9999",
  "employmentStatus": "active"
}
```

**Note:** You can send partial updates - only the fields you want to change.

**Success Response (200 OK):**
```json
{
  "success": true,
  "message": "Staff member updated successfully",
  "data": { /* Updated Staff object */ }
}
```

**Error Responses:**
- `400 Bad Request` - Validation error or invalid ID format
- `404 Not Found` - Staff member not found
- `409 Conflict` - Duplicate email (if email is being changed)
- `500 Internal Server Error` - Server error

---

### 5. Delete Staff Member (Soft Delete)

Soft delete a staff member by setting their employment status to 'inactive'.

**Endpoint:** `DELETE /api/staff/:id`

**Parameters:**
- `id` - Staff member's MongoDB ObjectId

**Success Response (200 OK):**
```json
{
  "success": true,
  "message": "Staff member deactivated successfully",
  "data": { /* Updated Staff object with status = 'inactive' */ }
}
```

**Error Responses:**
- `400 Bad Request` - Invalid ID format
- `404 Not Found` - Staff member not found
- `500 Internal Server Error` - Server error

---

## Validation Rules

### Required Fields
- `firstName` - Must be provided
- `lastName` - Must be provided
- `role` - Must be one of the valid roles
- `department` - Must be one of the valid departments
- `email` - Must be a valid email format and unique
- `phoneNumber` - Must be provided

### Enum Values

**Roles:**
- Doctor
- Nurse
- Administrator
- Technician
- Receptionist
- Other

**Departments:**
- Emergency
- Cardiology
- Pediatrics
- Surgery
- Radiology
- Administration
- Other

**Employment Status:**
- active (default)
- inactive
- on-leave

### Email Validation
- Must follow standard email format (e.g., `user@domain.com`)
- Must be unique across all staff members
- Stored in lowercase

---

## Usage Examples

### cURL Examples

#### Create a new staff member:
```bash
curl -X POST http://localhost:5000/api/staff \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Sarah",
    "lastName": "Smith",
    "role": "Nurse",
    "department": "Cardiology",
    "email": "sarah.smith@hospital.com",
    "phoneNumber": "+1-555-0125"
  }'
```

#### Get all doctors:
```bash
curl http://localhost:5000/api/staff?role=Doctor
```

#### Get active staff in Emergency department:
```bash
curl "http://localhost:5000/api/staff?department=Emergency&status=active"
```

#### Search for staff by name:
```bash
curl http://localhost:5000/api/staff?search=John
```

#### Get currently available staff:
```bash
curl http://localhost:5000/api/staff?available=true
```

#### Update a staff member:
```bash
curl -X PUT http://localhost:5000/api/staff/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{
    "phoneNumber": "+1-555-9999",
    "specialization": "Trauma Surgery"
  }'
```

#### Deactivate a staff member:
```bash
curl -X DELETE http://localhost:5000/api/staff/507f1f77bcf86cd799439011
```

---

## Setup and Running

### Prerequisites
- Node.js (v14 or higher)
- MongoDB instance (or MongoDB URI)

### Installation
```bash
npm install
```

### Configuration
Set the MongoDB connection string in environment variables:
```bash
export MONGODB_URI="mongodb://localhost:27017/demosession"
# or
export MONGO_URL="mongodb://localhost:27017/demosession"
```

### Running the Server
```bash
npm run server
```

The server will start on port 5000 (or the port specified in PORT environment variable).

---

## Error Handling

All API responses follow a consistent format:

**Success:**
```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": { /* Response data */ }
}
```

**Error:**
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message or validation errors"
}
```

### Common HTTP Status Codes
- `200 OK` - Request successful
- `201 Created` - Resource created successfully
- `400 Bad Request` - Invalid request data or parameters
- `404 Not Found` - Resource not found
- `409 Conflict` - Duplicate resource (e.g., email already exists)
- `500 Internal Server Error` - Server-side error

---

## Testing

Run the model validation tests:
```bash
node test-staff-model.js
```

This will verify:
- Model structure and required fields
- Enum validations (role, department, status)
- Email format validation
- Utility function behavior
- Availability calculation

---

## Notes

- The DELETE operation is a **soft delete** - it sets `employmentStatus` to 'inactive' rather than removing the record
- Staff members are sorted by last name, then first name in list operations
- The `available` filter checks availability for the current day/time when the request is made
- All timestamps are in ISO 8601 format
- Email addresses are automatically converted to lowercase
