# Insurance Calculator Application

## Overview

This is a basic full-stack application where users can enter customer data and calculate insurance prices. The application allows users to select additional options and discounts. The insurance price is calculated on the backend.

## Features

- Users can enter customer data.
- Calculate insurance prices based on the entered data.
- Select additional options and discounts.
- Backend handles the business logic for calculating insurance prices.

## Technologies Used

- **Frontend:**

  - React.js: Used for building the user interface.
  - Redux: Used for managing client-side state.
  - Tailwind CSS: Used for styling the frontend components.

- **Backend:**

  - Nest.js: A Node.js framework used for building scalable backend applications.
  - MongoDB: A NoSQL database used to store customer data.
  - TypeORM: Object-Relational Mapping (ORM) library for TypeScript to interact with relational databases.
  - Docker: Used to deploy MongoDB as a containerized application.

  ## Getting Started

To run the application locally, follow these steps:

1. Install dependencies:

   - Navigate to the root folder and run:

     ```bash
     npm install
     ```

   - Navigate to the frontend folder and run:

     ```bash
     cd frontend
     npm install
     ```

   - Navigate to the backend folder and run:

     ```bash
     cd ../backend
     npm install
     ```

2. Start the app:

   - Navigate back to the root folder and run:

     ```bash
     npm start

     ```

3. On every start of backend application, database is cleared and populated with initial data for base prices and policy modifiers (discounts, coverages and surchargers)

4. Open your browser and navigate to `http://localhost:3000` to use the application.

## Backend API Documentation

The backend API provides the following endpoints:

- `POST /calculate`: Calculate insurance price based on customer data.
- `GET /logs` : Retrieves insurance policy logs

You can test endpoints using swagger on `http://localhost:3001/api`
