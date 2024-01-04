# Project README

This README provides details about the RESTful API project for note management, including information on the chosen framework, database, and instructions on running the code and tests.

## Project Overview

The project aims to build a secure and scalable RESTful API for creating, reading, updating, and deleting notes. Additionally, users can share their notes with others and search for notes based on keywords.

## Technology Stack

### Framework: Express.js

- **Choice Rationale:** Express.js is a widely used and mature Node.js framework for building web applications. It provides a minimal and flexible structure, making it suitable for developing RESTful APIs.

### Database: MongoDB

- **Choice Rationale:** MongoDB is a NoSQL database that offers scalability and flexibility. Its document-oriented structure is well-suited for handling JSON-like documents, making it a good choice for storing and querying notes.

### Authentication Protocol: JSON Web Tokens (JWT)

- **Choice Rationale:** JWT is a stateless authentication mechanism that allows secure transmission of information between parties. It is well-suited for use in RESTful APIs, providing a simple and efficient way to handle user authentication.

### Rate Limiting and Request Throttling: Express Rate Limit

- **Choice Rationale:** Express Rate Limit is a middleware for Express.js that helps mitigate abuse of your API by limiting the number of requests a user can make. This adds an extra layer of security and ensures fair usage of the API.

### Text Indexing: MongoDB Text Search

- **Choice Rationale:** MongoDB Text Search allows for efficient searching of text content. It enables users to search for notes based on keywords, providing high-performance text indexing for better search functionality.

## Setup Instructions

### Prerequisites

- Node.js and npm installed
- MongoDB installed and running

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/speer_backend.git
   cd speer_backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application
1. Start the server:
    ```bash
        npm start
    ```
    The API will be accessible at http://localhost:3000.

### Running Tests
1. Run the tests:
   ```bash
       npm test
   ```
   This will execute unit and integration tests for the API endpoints.
### API Documentation
The API endpoints are documented in the code. You can refer to the API controllers and routes in the src/controllers and src/routes directories for details on available endpoints and their functionality.

### Additional Notes
- Ensure that MongoDB is running before starting the application.
- Update the .env file with appropriate values for production use.
