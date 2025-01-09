# On-Board Application

## Application Title
**On-Board - Your Comprehensive Job and Group Management Platform**

## Description
On-Board is a full-stack application designed to streamline job applications, group management, and networking for students, recruiters, and companies. This platform provides features like job posting, group creation, subscription-based services, and secure user authentication. It is built using React for the frontend and Node.js with Express for the backend, ensuring a seamless and responsive user experience.

---

## Folder and File Mapping

### Root Directory
- **README.md**: Documentation for the project.
- **client**: Contains the frontend React application.
- **server**: Contains the backend Node.js application.
- **package.json**: Lists dependencies and scripts for the entire project.
- **package-lock.json**: Auto-generated file for locking dependencies.

### Frontend Directory (`client`)
#### Folders and Files:
- **build**: Contains production-ready files after running `npm run build`.
- **node_modules**: Holds all frontend dependencies.
- **public**: Contains public assets like `index.html` and static files.
- **src**: Source code for the React application.
  - **components**: React components for the UI.
  - **context**: Context API for managing global state.
  - **utils**: Utility functions for reusable logic.
  - **App.js**: Main component that renders the application.
  - **index.js**: Entry point of the React application.

#### Key Files in `components`
- **NavBar.js**: Navigation bar component.
- **Jobs.js**: Displays job postings.
- **Groups.js**: Manages user groups.
- **ChatBot.js**: Interactive chatbot for job-related queries.

### Backend Directory (`server`)
#### Folders and Files:
- **app.js**: Main server file to set up the backend.
- **config.js**: Configuration settings for the server.
- **db.js**: Handles MongoDB connection.
- **middlewares**: Middleware functions for authentication and request handling.
- **models**: Database schema definitions.
- **routes**: Defines API endpoints.
- **controllers**: Contains logic for handling API requests.

#### Key Files in `controllers`
- **chatController.js**: Handles chat-related functionalities.
- **groupController.js**: Manages group creation and interaction.
- **subscriptionController.js**: Handles subscription payments.

---

## How to Start the Application

### Frontend
```bash
cd client
npm start # For development mode
# or
npm run dev # For development with additional features
```

### Backend
```bash
cd server
nodemon app.js # Automatically restarts the server on changes
```

---

## Structure Flow Diagram

```plaintext
Frontend (React)
  |
  --> Components (NavBar, Jobs, Groups, ChatBot, etc.)
  --> Context (Auth, Groups, Jobs)
  --> Utils (Utility functions)

Backend (Node.js + Express)
  |
  --> Routes (API endpoints for Jobs, Users, Groups, etc.)
  --> Controllers (Business logic)
  --> Models (Database schemas)
  --> Middlewares (Authentication and validation)
```

---

## GitHub Repository
[On-Board GitHub Repository](https://github.com/kru2710shna/On-Board)

---

## Dependencies Used
### Frontend Dependencies
- **react-router-dom**: Provides dynamic routing in the React application.
- **react-stripe-checkout**: Integrates Stripe for payment processing.

### Backend Dependencies
- **express**: Server framework for handling HTTP requests.
- **mongoose**: ODM for MongoDB.
- **cors**: Enables cross-origin requests.
- **helmet**: Enhances app security by setting HTTP headers.
- **morgan**: Logs HTTP requests for debugging.
- **stripe**: Handles backend Stripe payment processing.

---

## Additional Notes
- Ensure MongoDB is running locally or connected to a cloud instance.
- Use `.env` to store sensitive information like API keys and database URIs.

---
