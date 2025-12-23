# Task Management System (Next.js + Express + Supabase)

This is a full-stack **Task Management System** where users can register, log in, and manage their tasks.  
The frontend uses **Next.js + Tailwind CSS**, the backend is built with **Express.js + TypeScript**, and **Supabase** handles authentication and the database.

---

## 🚀 Features

### 🔐 Authentication
- User Signup and Login using **Supabase Auth**
- JWT-based authentication
- Protected routes using middleware

### ✅ Task Management (CRUD)
- Create tasks with Title, Description, Status (Pending / Completed)
- View all user-specific tasks
- Update task details or status
- Delete tasks

### 🔒 Security
- Supabase **Row Level Security (RLS)** enabled
- Users can only access their own tasks
- Backend authorization ensures users cannot modify others' tasks

---

## 🛠️ Tech Stack

### Frontend
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Fetch API

### Backend
- Node.js
- Express.js
- TypeScript
- Supabase Admin SDK

### Database & Auth
- Supabase (PostgreSQL)
- Supabase Authentication
- Row Level Security (RLS)

---


## Supabase Setup
### 1 Create tasks Table

- Run this in Supabase Dashboard → SQL Editor:

```
create table if not exists tasks (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  status text default 'Pending',
  user_id uuid references auth.users(id),
  created_at timestamp with time zone default now()
);
```

### 2 Enable Row Level Security
```
alter table tasks enable row level security;
```

### 3 Row Level Security Policies

- View Own Tasks
```
create policy "Users can view their own tasks"
on tasks
for select
using (auth.uid() = user_id);
```

- Create Tasks
```
create policy "Users can create their own tasks"
on tasks
for insert
with check (auth.uid() = user_id);
```

- Update Tasks
```
create policy "Users can update their own tasks"
on tasks
for update
using (auth.uid() = user_id);
```

- Delete Tasks
```
create policy "Users can delete their own tasks"
on tasks
for delete
using (auth.uid() = user_id);
```
## How to Run Locally
### 1 Clone Repository
```
git clone https://github.com/Kumarshailesh9/Task-Management-System.git
cd Task-Management-System
```
### 2 Start Backend (Express)
```
cd backend
npm install
npm run dev
```
Backend runs on: http://localhost:5000

### 3 Start Frontend (Next.js)
```
cd frontend
npm install
npm run dev
```

Frontend runs on: http://localhost:3000

## ⚙️ Environment Variables

### Backend (`backend/.env`)
```env
PORT=5000
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
SUPABASE_ANON_KEY=your_anon_key
```
---
## Validation Rules

- Task title cannot be empty
- Only authenticated users can create, update, or delete tasks
- Users cannot access tasks created by other users

