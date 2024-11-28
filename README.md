
# CampFindr

CampFindr is a web application designed to help users discover and book campsites. This guide provides the steps to set up the development environment and start the frontend and backend servers.

## Prerequisites

- Install the latest LTS version of [Node.js](https://nodejs.org/).
- Install Yarn globally:
  ```bash
  npm install -g yarn
  ```
- Clone the repository:
  ```bash
  git clone https://github.com/moeodeh3/CampFindr
  cd CampFindr
  ```

---

## Frontend Setup

### 1. Install Dependencies
Run the following command in the root project directory to install all required dependencies:
```bash
yarn
```

### 2. Start the Frontend Development Server
Start the server with:
```bash
yarn dev
```

### 3. Access the Application
Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to interact with the application.

---

## Backend Setup

### 1. Navigate to the Server Directory
```bash
cd server
```

### 2. Install Dependencies
Install backend dependencies:
```bash
yarn
```

### 3. Start the Backend Development Server
Run the following command:
```bash
yarn dev
```

### 4. Access the Backend API
Use a tool like Postman or your browser to interact with the API at [http://localhost:4000](http://localhost:4000).

---

## Project Structure

- **Frontend:** Contains the interactive web application for searching and booking campsites.
- **Backend:** Provides APIs for data retrieval, filtering, and availability queries.

---

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes or improvements.
