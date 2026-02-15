# Staff Management Backend - Quick Start Guide

## Overview

This implementation provides a complete backend API for managing hospital staff members. All acceptance criteria from the issue have been met.

## What Was Implemented

### 1. Files Created

```
server/
├── index.js              # Express server with MongoDB setup
├── models/
│   └── Staff.js          # Staff Mongoose schema/model
├── routes/
│   └── staff.js          # CRUD API routes
├── utils/
│   └── staffUtils.js     # Helper functions
├── STAFF_API.md          # Complete API documentation
└── SECURITY.md           # Security considerations
```

### 2. Dependencies Added

- `express` - Web framework
- `mongoose` - MongoDB ODM
- `cors` - Cross-origin resource sharing
- `body-parser` - Request body parsing
- `dotenv` - Environment variable management
- `mongodb-memory-server` (dev) - In-memory MongoDB for testing

## How to Use

### Start the Server

```bash
# Set MongoDB URI (optional - server will run without it)
export MONGODB_URI="mongodb://localhost:27017/demosession"

# Start the server
npm run server
```

The server will start on port 5000 and display:
```
Server is running on port 5000
API available at http://localhost:5000/api
```

### Test the API

#### 1. Check server health:
```bash
curl http://localhost:5000/api/health
```

#### 2. Create a staff member:
```bash
curl -X POST http://localhost:5000/api/staff \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "role": "Doctor",
    "department": "Emergency",
    "email": "john.doe@hospital.com",
    "phoneNumber": "+1-555-0123",
    "specialization": "Emergency Medicine",
    "qualifications": ["MD", "Board Certified"],
    "availability": {
      "monday": {"available": true, "hours": "9AM-5PM"},
      "tuesday": {"available": true, "hours": "9AM-5PM"},
      "wednesday": {"available": true, "hours": "9AM-5PM"},
      "thursday": {"available": true, "hours": "9AM-5PM"},
      "friday": {"available": true, "hours": "9AM-5PM"},
      "saturday": {"available": false, "hours": ""},
      "sunday": {"available": false, "hours": ""}
    }
  }'
```

#### 3. Get all staff:
```bash
curl http://localhost:5000/api/staff
```

#### 4. Filter by role:
```bash
curl http://localhost:5000/api/staff?role=Doctor
```

#### 5. Search by name:
```bash
curl http://localhost:5000/api/staff?search=John
```

#### 6. Get available staff:
```bash
curl http://localhost:5000/api/staff?available=true
```

### Run Tests

```bash
# Test model structure and validations
node test-staff-model.js
```

This will verify:
- ✅ All required fields
- ✅ Role enum validation
- ✅ Department enum validation
- ✅ Employment status enum validation
- ✅ Email format validation
- ✅ Availability helper function

## API Endpoints Summary

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/staff` | Create new staff member |
| GET | `/api/staff` | Get all staff (with filters) |
| GET | `/api/staff/:id` | Get single staff member |
| PUT | `/api/staff/:id` | Update staff member |
| DELETE | `/api/staff/:id` | Soft delete staff member |

## Query Filters

- `?role=Doctor` - Filter by role
- `?department=Emergency` - Filter by department
- `?status=active` - Filter by employment status
- `?available=true` - Filter by current availability
- `?search=John` - Search by first/last name

## Validation Rules

### Enums

**Roles**: Doctor, Nurse, Administrator, Technician, Receptionist, Other

**Departments**: Emergency, Cardiology, Pediatrics, Surgery, Radiology, Administration, Other

**Status**: active, inactive, on-leave

### Required Fields
- firstName, lastName
- role, department
- email (unique), phoneNumber

## Acceptance Criteria ✅

All acceptance criteria from the issue have been met:

- ✅ Staff model with all required fields
- ✅ POST /api/staff creates staff with validation
- ✅ GET /api/staff with filters (role, department, status, available, search)
- ✅ GET /api/staff/:id returns single staff
- ✅ PUT /api/staff/:id updates staff
- ✅ DELETE /api/staff/:id soft deletes (sets to inactive)
- ✅ Role validation enum
- ✅ Department validation enum
- ✅ Employment status enum
- ✅ Email uniqueness (409 Conflict response)
- ✅ Proper error handling and validation

## Documentation

- **Full API Docs**: See `server/STAFF_API.md`
- **Security Notes**: See `server/SECURITY.md`

## Notes

- The DELETE operation is a soft delete (sets `employmentStatus` to 'inactive')
- Email addresses are automatically converted to lowercase
- All dates are in ISO 8601 format
- The server can run without MongoDB (for testing structure)
- For production, set `MONGODB_URI` environment variable

## Next Steps (Not in Current Scope)

For production deployment, consider:
- Rate limiting (see SECURITY.md)
- Authentication/authorization
- Input sanitization for XSS prevention
- HTTPS enforcement
- Comprehensive logging
