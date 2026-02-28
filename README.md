# 📦 B2B Enterprise Inventory Management System

> 🎥 **[Watch the 2-Minute Demo Video Here](YOUR-VIDEO-LINK-HERE)**

A full-stack Monolithic ERP application designed to track warehouse stock, manage suppliers, and process secure sales orders. Built with a focus on role-based security and real-time data visualization.

## 🛠️ Tech Stack
* **Frontend:** React.js, JavaScript, Bootstrap 5, HTML5/CSS3
* **Backend:** Java 17, Spring Boot 3, RESTful APIs, Hibernate/JPA
* **Database:** MySQL
* **Architecture:** Monolithic

## ✨ Key Features
* **Role-Based Access Control (RBAC):** Secure routing and API endpoints restricting Admin, Manager, and Sales Rep privileges.
* **Interactive Dashboard:** Real-time revenue tracking and automated visual alerts for low-stock inventory items.
* **Seamless Transactions:** Point-of-Sale (POS) capabilities for processing orders and instantly updating database quantities.
* **Secure Sessions:** Utilizes HTML5 `localStorage` for maintaining persistent, role-specific user logins.

## 🚀 How to Run Locally

### 1. Database Setup
* Create a MySQL database named `inventory_db`.
* Update the `application.properties` file in the backend with your MySQL username and password.

### 2. Backend (Spring Boot)
* Navigate to the `backend` folder.
* Run the application using your IDE or via Maven: `mvn spring-boot:run`
* The server will start on `http://localhost:8080`.

### 3. Frontend (React)
* Navigate to the `frontend` folder.
* Install dependencies: `npm install`
* Start the development server: `npm start`
* The application will open on `http://localhost:3000`.
