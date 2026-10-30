# StudentSphere — Modern Academic Student Management System
### Web Technology Laboratory — Assignment 7 (MERN Stack)

**Student Details:**
- **Name:** Prachi Lohkare
- **PRN:** 202401040025
- **Branch:** Computer Engineering
- **Institution:** MIT Academy of Engineering (MITAOE), Alandi, Pune
- **Course:** B.Tech Computer Engineering • Semester VI
- **Academic Year:** 2026–2027

---

## 1. System Overview & Architectural Design

**StudentSphere** is a modern, responsive, full-stack Academic Student Management Portal engineered with the **MERN Stack** (MongoDB Atlas, Express.js, React 18, Node.js) and the native browser **Fetch API**. 

The application delivers a **Modern Academic Dashboard** theme with a soft lavender canvas (`#f5f3ff`), pure white surfaces (`#ffffff`), and deep royal purple accents (`#4c1d95`, `#7c3aed`). It features a collapsible left sidebar, clean top navigation bar, analytics dashboard, modern student records table, and real-time database queries with dual-layer constraint validation.

```
                      +-------------------------------------------------+
                      |             React 18 + Vite Frontend            |
                      |            (Modern Academic Dashboard)          |
                      +-----------------------+-------------------------+
                                              |
                                              | Asynchronous JSON HTTP Requests
                                              | (Native Browser Fetch API)
                                              v
                      +-------------------------------------------------+
                      |           Node.js & Express REST API            |
                      |          (Controllers, Routes, Middleware)      |
                      +-----------------------+-------------------------+
                                              |
                                              | Mongoose 8.x ODM
                                              | (Schema Constraints & Indexing)
                                              v
                      +-------------------------------------------------+
                      |               MongoDB Atlas Cloud               |
                      |      (Database: student_management / students)   |
                      +-------------------------------------------------+
```

### Technology Stack Specifications

| Layer | Technology | Version | Purpose |
| :--- | :--- | :--- | :--- |
| **Frontend UI** | React.js | `18.3.1` | Single Page Application with component state management |
| **Bundler & Tooling** | Vite | `6.0.7` | High-speed ESM build tool & dev server |
| **Styling** | Custom CSS3 | Modern | Soft Lavender & Dark Purple academic design system |
| **Backend Runtime** | Node.js | `>= 18.x` | JavaScript server runtime environment |
| **Web Framework** | Express.js | `4.21.2` | RESTful routing, centralized error handling & CORS |
| **Object Data Modeling** | Mongoose | `8.9.5` | Strict schema validation, B-tree unique indexes |
| **Database** | MongoDB Atlas | Cloud NoSQL | Cloud document database (Collection: `students`) |
| **API Client** | Native Fetch API | Browser Std | Asynchronous HTTP requests with error parsing |

---

## 2. Key Capabilities & Features

### A. Academic Dashboard
- **Real-Time KPIs**: Total enrolled students, academic department count, academic year cohorts, and live MongoDB Atlas database connection status.
- **Departmental Distribution Analytics**: Dynamic visual progress bars calculating enrolled student percentages per department.
- **Academic Year Cohorts**: Visual breakdown across First, Second, Third, and Final Year students.
- **Recently Enrolled Students**: Quick-access summary table with direct profile viewing and editing actions.
- **Quick Action Triggers**: Instant one-click student registration shortcuts.

### B. Student Registration & Validation (Create)
- Form fields: Student Full Name, Permanent Registration Number (PRN), Official College Email, Engineering Department, Year of Study, and 10-Digit Mobile Number.
- **Dual-Layer Validation**: Client-side feedback before transmission and server-side Mongoose schema validation.
- **Duplicate PRN Guard**: Prevents duplicate enrollment using MongoDB unique B-tree index and returns `409 Conflict` with clear feedback.

### C. Student Directory & Profile Viewing (Read)
- Modern academic data table with spacious cells, student monogram avatars, and status badges.
- **Student Profile Modal**: Deep-dive popup viewing complete student details, enrollment timestamp, and MongoDB Document ObjectId.

### D. Record Modification (Update)
- Prefilled form loading existing data for instantaneous updates.
- Enforces data integrity without altering the immutable PRN.

### E. Record Deletion (Delete)
- Interactive deletion confirmation modal displaying student Name, PRN, and Department to prevent accidental data loss.
- Immediate synchronization upon atomic database deletion.

### F. Query Engine (Direct MongoDB Integration)
1. **Multi-field Search**: Real-time regex query searching across student name, PRN, and email.
2. **Multi-attribute Filtering**: Filter by Engineering Department and Academic Year.
3. **Multi-column Sorting**: Sort by Name, PRN, Department, or Enrollment Date in Ascending (A–Z) or Descending (Z–A) order.
4. **Pagination**: Configurable page limit (8 records per page) with page number indicators, total count calculations, and navigation buttons.

---

## 3. Project Directory Structure

```text
202401040083_PrachiLohkare_P7_StudentManagement/
├── client/                               # Frontend Single Page Application
│   ├── dist/                             # Production build bundle
│   ├── src/
│   │   ├── components/
│   │   │   ├── AboutModal.jsx            # Student credentials & architecture dialog
│   │   │   ├── Dashboard.jsx             # Analytics KPIs & distribution bars
│   │   │   ├── DeleteModal.jsx           # Deletion confirmation dialog
│   │   │   ├── Notification.jsx          # Toast alert notifications
│   │   │   ├── Pagination.jsx            # Page pagination controls
│   │   │   ├── QueryBar.jsx              # Search, filter, and sort controls
│   │   │   ├── Sidebar.jsx               # Collapsible left navigation sidebar
│   │   │   ├── StudentForm.jsx           # Add & Edit form with validation
│   │   │   ├── StudentTable.jsx          # Modern student records data table
│   │   │   ├── Topbar.jsx                # Clean top navigation bar with profile
│   │   │   └── ViewStudentModal.jsx      # Detailed student profile view popup
│   │   ├── services/
│   │   │   └── api.js                    # Native Fetch API client
│   │   ├── App.jsx                       # Root React state & routing coordinator
│   │   ├── index.css                     # Soft Lavender & Royal Purple CSS design system
│   │   └── main.jsx                      # React 18 DOM mount point
│   ├── index.html                        # Application entry point & typography
│   ├── package.json                      # Frontend dependencies
│   ├── package-lock.json
│   └── vite.config.js                    # Vite bundler configuration
├── server/                               # Backend REST API Server (Preserved)
│   ├── config/
│   │   └── db.js                         # MongoDB Atlas connection & fallback
│   ├── controllers/
│   │   └── studentController.js          # REST business logic & queries
│   ├── middleware/
│   │   └── errorMiddleware.js            # Centralized error handler
│   ├── models/
│   │   └── Student.js                    # Mongoose Schema & validation constraints
│   ├── routes/
│   │   └── studentRoutes.js              # Express REST endpoint routes
│   ├── tests/
│   │   └── api.test.js                   # 51-point automated verification suite
│   ├── .env.example                      # Server environment template
│   ├── package.json                      # Backend dependencies & scripts
│   ├── package-lock.json
│   └── server.js                         # Express HTTP server & static handler
├── screenshots/
│   └── architecture_diagram.png          # System architecture visual diagram
├── .env.example                          # Root environment template
├── .gitignore                            # Excludes node_modules, .env, and temp files
├── make_zip.py                           # Automated archive generator
└── README.md                             # Comprehensive technical manual & deployment guide
```

---

## 4. REST API Specification

All endpoints are hosted under `/api/students`:

| HTTP Method | Route | Description | Query / Body Parameters | Status Codes |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/students` | Fetch students with query filtering | `search`, `department`, `year`, `sortBy`, `order`, `page`, `limit` | `200 OK` |
| `GET` | `/api/students/stats` | Fetch aggregated dashboard analytics | None | `200 OK` |
| `GET` | `/api/students/:id` | Fetch single student record by ID | Route param: `:id` (MongoDB ObjectId) | `200 OK`, `404 Not Found` |
| `POST` | `/api/students` | Register a new student record | JSON body: `{ name, prn, email, department, year, mobile }` | `201 Created`, `400 Bad Request`, `409 Conflict` |
| `PUT` | `/api/students/:id` | Update an existing student record | Route param: `:id`, JSON body with fields to modify | `200 OK`, `400 Bad Request`, `404 Not Found` |
| `DELETE` | `/api/students/:id` | Delete a student document | Route param: `:id` | `200 OK`, `404 Not Found` |
| `GET` | `/api/health` | Service health status check | None | `200 OK` |

---

## 5. Local Setup & Execution Guide

### Prerequisites
- **Node.js**: Version 18.x or later installed (`node -v`)
- **npm**: Version 9.x or later installed (`npm -v`)
- **MongoDB Atlas** account (or run offline with the built-in automated in-memory MongoDB fallback)

### Step 1: Extract or Navigate to the Project Folder
```bash
cd 202401040083_PrachiLohkare_P7_StudentManagement
```

### Step 2: Configure Environment Variables
Copy `.env.example` in `server/` to `.env`:
```bash
cp server/.env.example server/.env
```
Edit `server/.env`:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/student_management?retryWrites=true&w=majority
CLIENT_URL=http://localhost:5173
```
*(Note: If no Atlas URI is provided, the server automatically starts an in-memory MongoDB instance with seed data for offline demonstration).*

### Step 3: Install Dependencies
Open two separate terminal windows:

**Terminal 1 — Backend Server:**
```bash
cd server
npm install
npm run dev
# Server runs at http://localhost:5000
# API Endpoint: http://localhost:5000/api/students
```

**Terminal 2 — Frontend Client:**
```bash
cd client
npm install
npm run dev
# Vite dev server runs at http://localhost:5173
```

---

## 6. Comprehensive Cloud Deployment Guide

### Deployment Model A: Decoupled Cloud Deployment (Recommended)
Deploy the backend on **Render.com** and the frontend on **Vercel** or **Netlify**.

#### Part 1: MongoDB Atlas Database Setup
1. Log in to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a free **M0 Sandbox Cluster**.
3. Under **Security → Database Access**, add a database user (e.g., `student_admin`) with a secure password and **Read and write to any database** privileges.
4. Under **Security → Network Access**, add IP address `0.0.0.0/0` (Allow Access from Anywhere) to permit cloud connections from Render.
5. Under **Deployment → Database**, click **Connect** → **Drivers (Node.js)** → Copy the Connection String.
6. Replace `<password>` with your database user password and append `/student_management` as the database name:
   ```text
   mongodb+srv://student_admin:YOUR_PASSWORD@cluster0.abcde.mongodb.net/student_management?retryWrites=true&w=majority
   ```

#### Part 2: Backend Deployment on Render (render.com)
1. Push your repository to your GitHub account.
2. Sign in to [Render](https://render.com) and click **New +** → **Web Service**.
3. Select and connect your repository.
4. Fill in the deployment settings:
   - **Name:** `studentsphere-api`
   - **Root Directory:** `server`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
   - **Plan:** Free
5. Under **Environment Variables**, add:
   - `PORT`: `5000`
   - `NODE_ENV`: `production`
   - `MONGODB_URI`: *Your MongoDB Atlas connection URI from Part 1*
   - `CLIENT_URL`: `https://your-frontend-app.vercel.app` *(update once frontend is deployed)*
6. Click **Deploy Web Service**.
7. Once deployed, copy your backend URL (e.g., `https://studentsphere-api.onrender.com`).
8. Verify health status in your browser: `https://studentsphere-api.onrender.com/api/health`.

#### Part 3: Frontend Deployment on Vercel (vercel.com)
1. Sign in to [Vercel](https://vercel.com) and click **Add New...** → **Project**.
2. Import your GitHub repository.
3. Configure project settings:
   - **Framework Preset:** `Vite`
   - **Root Directory:** `client`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Under **Environment Variables**, add:
   - `VITE_API_URL`: `https://studentsphere-api.onrender.com/api`
5. Click **Deploy**.
6. Vercel will build and assign your live production URL (e.g., `https://studentsphere.vercel.app`).
7. Update `CLIENT_URL` in Render environment variables with your Vercel URL to finalize CORS security.

---

### Deployment Model B: Unified Single-Server Deployment
Express.js in `server/server.js` is pre-configured to automatically serve the production build from `client/dist`.

1. Build the frontend client:
   ```bash
   cd client
   npm install
   npm run build
   ```
2. The compiled assets will be output to `client/dist`.
3. In `server/`, start the Express server:
   ```bash
   cd ../server
   npm install
   NODE_ENV=production node server.js
   ```
4. Access `http://localhost:5000` in your web browser. Express will seamlessly serve both the React frontend and all `/api/*` endpoints from a single host!

---

## 7. Automated Testing & Quality Assurance

The project includes an end-to-end automated verification suite covering 51 distinct test assertions across all 10 core functional groups:

```bash
cd server
npm test
```

### Verified Test Groups:
- **Group 1**: Client & Server input validation (rejection of missing fields, invalid emails, invalid mobile numbers).
- **Group 2**: Student creation (`POST /api/students`).
- **Group 3**: Prevention of duplicate PRNs (`409 Conflict`).
- **Group 4**: Student retrieval by list and single ObjectId (`GET /api/students/:id`).
- **Group 5**: Record updates (`PUT /api/students/:id`).
- **Group 6**: Multi-field regex search (Name, PRN, Email) and filtering (Department, Year).
- **Group 7**: Multi-field sorting (ascending/descending) and database pagination.
- **Group 8**: Dashboard KPI aggregation (`GET /api/students/stats`).
- **Group 9**: Document deletion (`DELETE /api/students/:id`) and 404 verification.
- **Group 10**: Error handling and malformed MongoDB ObjectId rejection.

---

## 8. College Practical & Viva Questions

### Q1: What is the MERN stack and how do its layers communicate in StudentSphere?
> **Answer:** MERN represents MongoDB (database tier), Express.js (backend web framework), React.js (client user interface), and Node.js (JavaScript runtime). In StudentSphere, React components handle user interaction and trigger asynchronous HTTP requests via the browser's native Fetch API. Express routes these requests to controller functions that use Mongoose ODM to query or mutate documents inside MongoDB Atlas. The JSON response is parsed by React, updating component state and seamlessly re-rendering the Modern Academic Dashboard without page reloads.

### Q2: Why is Mongoose preferred over the raw MongoDB native driver?
> **Answer:** Mongoose provides an Object Data Modeling (ODM) layer that establishes a rigorous schema over schema-less MongoDB documents. It provides built-in validation rules (e.g., regex checks for phone numbers and emails, enum validation for departments and academic years), automatic type casting, lifecycle hooks, and B-tree unique indexes, guaranteeing database integrity before documents are persisted.

### Q3: How is duplicate PRN prevention enforced?
> **Answer:** Duplicate PRN prevention is enforced at two distinct levels:
> 1. **Database Schema Level:** `prn: { type: String, unique: true }` instructs MongoDB to construct a unique B-tree index on the `prn` field. If a duplicate insert is attempted, MongoDB raises an `E11000 duplicate key error`.
> 2. **Controller & Middleware Level:** In `studentController.js`, `await Student.findOne({ prn })` checks for existing records prior to insertion, responding with a user-friendly `HTTP 409 Conflict`. Centralized `errorMiddleware.js` also catches any race-condition `11000` errors and transforms them into clear messages.

### Q4: How do search, multi-field filtering, sorting, and pagination work on the backend?
> **Answer:** In `studentController.js`, a dynamic MongoDB query object is constructed:
> - **Search:** Uses case-insensitive regex: `query.$or = [{ name: regex }, { prn: regex }, { email: regex }]`.
> - **Filter:** Matches exact fields: `query.department = department` and `query.year = year`.
> - **Sort:** Uses `Student.find(query).sort({ [sortBy]: order === 'asc' ? 1 : -1 })`.
> - **Pagination:** Uses `.skip((page - 1) * limit).limit(limit)` paired with `Student.countDocuments(query)` to calculate `totalPages`.

### Q5: How are confidential database credentials protected during deployment?
> **Answer:** Credentials are never hardcoded in source files. They are managed through environment variables via `.env` files locally and secure environment panels on cloud hosts (Render and Vercel). `.env` is strictly ignored in `.gitignore`, preventing credentials from being committed to version control. An environment template `.env.example` is provided for reference.

---
*MIT Academy of Engineering (MITAOE) • Department of Computer Engineering • Web Technology Laboratory (2304362L)*
