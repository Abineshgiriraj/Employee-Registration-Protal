# 🧑‍💼 Employee Registration Portal

## 📖 Project Description

The **Employee Registration Portal** is a full-stack web application designed to manage employee details efficiently using **role-based authentication and authorization**.

- **Users** can log in and register employee details.
- **Admins** can view all registered employee records.
- The application uses **JWT authentication** for security.
- Backend is built with **Django REST Framework**.
- Frontend is built using **Angular**.
- **MySQL** is used as the primary database.
- Google authentication using **Firebase** was explored as an optional feature.

This project demonstrates real-world full-stack concepts such as authentication, REST APIs, role-based access, and frontend–backend integration.

---

## ✨ Features

- Username & Password login
- Role-based access (Admin / User)
- Employee registration form
- Admin dashboard to view all employees
- JWT-based authentication
- Angular HTTP Interceptor for secured API calls
- MySQL database integration
- Clean UI with loading states and validations

---

## 🛠️ Technology Stack

### Frontend
- Angular
- TypeScript
- HTML5
- CSS3

### Backend
- Python 3.13
- Django
- Django REST Framework
- Simple JWT

### Database
- MySQL

### Authentication
- JWT (Access & Refresh Tokens)
- Firebase Google Authentication (Optional / Experimental)

---

## 🧩 System Architecture (High-Level)
    Angular Frontend
          |
    HTTP Requests (JWT in Authorization Header)
          |
    Django REST API
          |
          |
    MySQL Database


---

## 👥 User Roles

### 🔹 Admin
- Login to admin dashboard
- View all registered employees
- Read-only access to employee data

### 🔹 User
- Login using username & password
- Register employee details
- Cannot view all employee records

---
# Employee Registration System

## ⚙️ Setup & Installation

### 🔧 Backend Setup (Django)

1.  **Navigate to the backend directory and set up the environment:**
    ```bash
    cd backend/server
    python -m venv venv
    
    # Activate virtual environment
    # On Windows:
    venv\Scripts\activate
    # On macOS/Linux:
    source venv/bin/activate

    # Install dependencies
    pip install -r requirements.txt
    ```

2.  **Configure MySQL Database** Update the `DATABASES` setting in `settings.py`:
    ```python
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.mysql',
            'NAME': 'employee_db',
            'USER': 'root',
            'PASSWORD': 'your_password',
            'HOST': 'localhost',
            'PORT': '3306',
        }
    }
    ```

3.  **Run Migrations & Initialize Admin:**
    ```bash
    python manage.py makemigrations
    python manage.py migrate
    python manage.py createsuperuser
    ```

4.  **Start the Backend Server:**
    ```bash
    python manage.py runserver
    ```
    *Backend runs at:* `http://localhost:8000`

---

### 🎨 Frontend Setup (Angular)

1.  **Install dependencies and start the application:**
    ```bash
    cd client
    npm install
    ng serve
    ```
    *Frontend runs at:* `http://localhost:4200`

---

## 🔐 Authentication Flow

* **Login**: User logs in with a username and password.
* **Token Issuance**: The backend returns **JWT access and refresh tokens**.
 * **HTTP Interceptor**: An Angular interceptor automatically attaches the token to every outgoing request:  
    `Authorization: Bearer <access_token>`
* **Validation**: The backend validates the token before granting access to protected data.

---

## 🌐 API Overview

| Method | Endpoint | Description | Role |
| :--- | :--- | :--- | :--- |
| **POST** | `/api/login/` | User login | User / Admin |
| **GET** | `/api/employees/list/` | Get all employees | Admin |
| **POST** | `/api/employees/create/` | Register new employee | User |
| **POST** | `/api/token/refresh/` | Refresh JWT token | Auth |

---

## 📁 Project Structure

### Backend
```text
backend/
└── server/
    ├── accounts/
    ├── employees/
    ├── server/
    └── manage.py
```

### Frontend
```
client/
└── src/
    ├── app/
    │   ├── login/
    │   ├── admin-dashboard/
    │   ├── employee-form/
    │   ├── services/
    │   └── interceptors/
