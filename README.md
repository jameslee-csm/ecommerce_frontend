# E-Commerce Frontend

A React-based e-commerce frontend application using the ClickHouse UI components.

## Features

- Product browsing and searching
- Shopping cart functionality
- Order history and tracking
- Credit management
- Responsive design with ClickHouse UI components

## Tech Stack

- React 18
- TypeScript
- React Router v6
- Styled Components
- Axios for API requests
- ClickHouse UI components

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- Yarn or npm

### Installation

1. Clone the repository
2. Install dependencies:

   ```
   yarn install
   ```

   or

   ```
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env` (if needed)
   - Configure the backend API URL

### Running the Application

#### Development Mode

```
yarn start
```

or

```
npm start
```

The application will be available at http://localhost:3000

#### Production Build

```
yarn build
```

or

```
npm run build
```

### Docker

The application can be run using Docker:

```
docker-compose up
```

This will start the application at http://localhost:5000
