# ServiceHive — Smart Leads Dashboard

A full-stack lead management dashboard built with the MERN stack + TypeScript.

## Tech Stack

- **Frontend**: React.js, TypeScript, TailwindCSS, Redux Toolkit
- **Backend**: Node.js, Express.js, TypeScript, MongoDB, Mongoose
- **Auth**: JWT, bcrypt, Role-Based Access Control (Admin + Sales)
- **Infra**: Docker, Docker Compose

## Features

- JWT Authentication (Register, Login, Protected Routes)
- Leads CRUD (Create, Read, Update, Delete)
- Advanced Filtering (Status, Source, Search by name/email)
- Backend Pagination (10 per page with metadata)
- Debounced Search (400ms delay)
- CSV Export
- Role-Based Access Control (Admin can delete, Sales can view/edit)
- Responsive Dashboard UI
- Dark Mode
- Docker Setup (one command to run everything)

## Project Structure
# ServiceHive — Smart Leads Dashboard

A full-stack lead management dashboard built with the MERN stack + TypeScript.

## Tech Stack

- **Frontend**: React.js, TypeScript, TailwindCSS, Redux Toolkit
- **Backend**: Node.js, Express.js, TypeScript, MongoDB, Mongoose
- **Auth**: JWT, bcrypt, Role-Based Access Control (Admin + Sales)
- **Infra**: Docker, Docker Compose

## Features

- JWT Authentication (Register, Login, Protected Routes)
- Leads CRUD (Create, Read, Update, Delete)
- Advanced Filtering (Status, Source, Search by name/email)
- Backend Pagination (10 per page with metadata)
- Debounced Search (400ms delay)
- CSV Export
- Role-Based Access Control (Admin can delete, Sales can view/edit)
- Responsive Dashboard UI
- Dark Mode
- Docker Setup (one command to run everything)

## Project Structure

```text
smart-leads/
├── client/               # React + TypeScript + TailwindCSS
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── hooks/        # Custom hooks (useDebounce)
│   │   ├── pages/        # Login, Register, Dashboard
│   │   ├── services/     # API calls (Axios)
│   │   ├── store/        # Redux slices
│   │   ├── types/        # TypeScript interfaces
│   │   └── utils/        # CSV export, date formatting
│   └── Dockerfile
├── server/               # Node.js + Express + TypeScript
│   ├── src/
│   │   ├── config/       # MongoDB connection
│   │   ├── controllers/  # Auth + Lead logic
│   │   ├── middleware/   # Auth, Role, Error handling
│   │   ├── models/       # Mongoose schemas
│   │   ├── routes/       # API routes
│   │   ├── types/        # TypeScript interfaces
│   │   └── utils/        # JWT token generation
│   └── Dockerfile
├── docker-compose.yml
└── README.md
```

## Setup Instructions

### Prerequisites

- Node.js 18+
- MongoDB running locally (or Docker)
- npm or yarn

### Option 1 — Docker (Recommended)

```bash
git clone https://github.com/Gourav-Chouhan-IT/smart-leads.git
cd smart-leads
docker compose up --build
```

- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- MongoDB: localhost:27017

### Option 2 — Manual Setup

**Backend:**
```bash
cd server
cp .env.example .env
npm install
npm run dev
```

**Frontend:**
```bash
cd client
cp .env.example .env
npm install
npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## API Documentation

### Auth Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | /api/auth/register | Register a new user | No |
| POST | /api/auth/login | Login user | No |

**Register Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456",
  "role": "admin"
}
```

**Login Body:**
```json
{
  "email": "john@example.com",
  "password": "123456"
}
```

### Lead Endpoints

| Method | Endpoint | Description | Auth | Role |
|--------|----------|-------------|------|------|
| GET | /api/leads | Get all leads (paginated) | Yes | Admin, Sales |
| POST | /api/leads | Create a new lead | Yes | Admin, Sales |
| GET | /api/leads/:id | Get lead by ID | Yes | Admin, Sales |
| PUT | /api/leads/:id | Update a lead | Yes | Admin, Sales |
| DELETE | /api/leads/:id | Delete a lead | Yes | Admin only |

**Query Parameters for GET /api/leads:**

| Param | Type | Description |
|-------|------|-------------|
| page | number | Page number (default: 1) |
| limit | number | Items per page (default: 10) |
| status | string | Filter by status (New, Contacted, Qualified, Lost) |
| source | string | Filter by source (Website, Instagram, Referral) |
| search | string | Search by name or email |
| sort | string | Sort order (latest, oldest) |

**Create/Update Lead Body:**
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "status": "New",
  "source": "Website",
  "phone": "+1234567890",
  "company": "Acme Inc.",
  "message": "Interested in our services"
}
```

**Paginated Response:**
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "total": 25,
    "page": 1,
    "pages": 3,
    "limit": 10
  }
}
```

## Environment Variables

### Server
| Variable | Description |
|----------|-------------|
| PORT | Server port (default: 5000) |
| MONGO_URI | MongoDB connection string |
| JWT_SECRET | Secret key for JWT signing |
| JWT_EXPIRES_IN | Token expiry (default: 7d) |
| NODE_ENV | Environment (development/production) |

### Client
| Variable | Description |
|----------|-------------|
| VITE_API_URL | Backend API base URL |

## Default Users

Register with role `admin` for full access or `sales` for limited access.

- **Admin**: Can create, read, update, and delete leads
- **Sales**: Can create, read, and update leads (no delete)

## Author

**Gourav Chouhan**
- GitHub: [@Gourav-Chouhan-IT](https://github.com/Gourav-Chouhan-IT)