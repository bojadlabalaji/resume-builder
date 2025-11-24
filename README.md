# Resume Builder

A full-stack resume builder application with a FastAPI backend and a Next.js frontend.

## Prerequisites

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Project Structure

- `backend/`: FastAPI application
- `frontend/`: Next.js application
- `docker-compose.yml`: Docker Compose configuration

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd resume-builder
```

### 2. Environment Setup

#### Backend

Create a `.env` file in the `backend` directory. You can use the following template:

```bash
# backend/.env

# Optional: Google API Key for Generative AI features
GOOGLE_API_KEY=your_google_api_key_here
GOOGLE_GENAI_USE_VERTEXAI=False
```

#### Frontend

The frontend is configured to connect to the backend at `http://localhost:8000`. If you need to change this, you may need to adjust the configuration in the frontend code.

### 3. Run with Docker Compose

To build and start the application, run:

```bash
docker-compose up --build
```

This command will:
- Build the backend image (Python 3.13-slim)
- Build the frontend image (Node 20-alpine)
- Start the backend service on port `8000`
- Start the frontend service on port `3000`

### 4. Access the Application

Once the containers are running, you can access:

- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend API Documentation**: [http://localhost:8000/docs](http://localhost:8000/docs)

## Development

### Running Locally (Without Docker)

If you prefer to run the services locally for development:

#### Backend

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Create a virtual environment and activate it:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run the server:
   ```bash
   uvicorn main:app --reload
   ```

#### Frontend

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
