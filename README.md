# Inventory Management System (IMS) Project

This is a full-stack Inventory Management System built with Angular (frontend) and Flask (backend), using PostgreSQL as the database. The project is containerized with Docker for easy setup and deployment.

---

---

## Features

- **Product CRUD:** Add, edit, delete, and list products.
- **Angular Frontend:** Modern UI with reactive forms and routing.
- **Flask REST API:** Endpoints for product management.
- **PostgreSQL Database:** Persistent storage for products.
- **Dockerized:** Easy to run locally or deploy.
- **CORS Enabled:** Frontend and backend communicate seamlessly.

---

## Prerequisites

- [Docker](https://www.docker.com/) (recommended)
- Or: Node.js (v18+), Python 3.11+, PostgreSQL (if running without Docker)

---

## Getting Started

### 1. Clone the Repository

```sh
git clone https://github.com/thewavydev/ims-project.git
cd ims-project

2. Run with Docker (Recommended)
docker-compose up -build     
This will start the backend, frontend, and database.

Frontend: http://localhost:4200
Backend API: http://localhost:5000/api/products
PostgreSQL: port 5432

3. Manual Setup (Without Docker)

# Backend
cd backend
python -m venv venv
source venv/bin/activate  #Windows
pip install -r requirements.txt
export FLASK_APP=app.py
export FLASK_ENV=development
flask run

## Frontend
cd frontend
npm install
ng serve


## API Endpoints
GET /api/products — List all products
GET /api/products/<id> — Get a product by ID
POST /api/products — Add a new product
PUT /api/products/<id> — Update a product
DELETE /api/products/<id> — Delete a product


#State Management Strategy
This application uses a service with a BehaviorSubject to manage the product list state. When a product is updated (via PUT) or deleted (via DELETE), the service updates the local BehaviorSubject directly instead of issuing a new GET request for all products.

PUT (Update):
After a successful update, the service maps over the current product array in the BehaviorSubject, replacing the updated product by ID with the new data from the response.

DELETE:
After a successful delete, the service filters out the deleted product by ID from the current BehaviorSubject value.

This approach ensures the UI reflects changes instantly and reduces unnecessary API calls, keeping the frontend state in sync with the backend efficiently.
