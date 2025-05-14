# Quaestio Front

QuaestioFront is the modern web interface for the Quaestio platform, built with Next.js and Material UI. It provides a responsive, user-friendly UI that interacts with the QuaestioAPI backend.

## Prerequisites

- Node.js (≥ 20.0.0)
- npm

## Installation

Clone the repository and install the dependencies:

```bash
# Navigate to the project directory
cd QuaestioFront

# Install dependencies
npm install
```

## Running the Application

### Development Mode

To run the application in development mode:

```bash
npm run dev
```

This will start the development server on port 2500. You can access the application at [http://localhost:2500](http://localhost:2500).

### Production Build

To create a production build:

```bash
npm run build
```

To start the production server:

```bash
npm run start
```

## Linting and Type Checking

```bash
# Lint the code
npm run lint

# Type check
npm run type-check
```

## Project Structure

```
QuaestioFront/
├── public/            # Static files
├── src/               # Source code
│   ├── app/           # Next.js App Router pages and layouts
│   ├── components/    # Reusable UI components
│   ├── hooks/         # Custom React hooks
│   ├── lib/           # Utility libraries and configuration
│   ├── redux/         # Redux store configuration and slices
│   ├── types/         # TypeScript type definitions
│   ├── utils/         # Helper functions and utilities
│   ├── service.js     # API service configuration
│   ├── theme.ts       # UI theme configuration
│   └── utils.ts       # General utility functions
├── .eslintrc.json     # ESLint configuration
├── next.config.js     # Next.js configuration
├── tsconfig.json      # TypeScript configuration
└── package.json       # Project dependencies and scripts
```

## Technologies Used

- **Next.js**: React framework for server-rendered applications
- **Material UI**: Component library for modern UI design
- **TypeScript**: Type-safe JavaScript
- **Redux**: State management
- **React Flow (@xyflow/react)**: Library for building node-based diagrams
- **Axios**: HTTP client for API requests

## Integration with QuaestioAPI

This frontend connects to the QuaestioAPI backend. Make sure the API is running when using this application. See the [QuaestioAPI documentation](/Web/QuaestioAPI/README.md) for more information on how to set up and run the backend.

## Contributing

Please follow the project's coding standards when contributing:

- Use TypeScript for type safety
- Follow ESLint rules
- Organize imports using the simple-import-sort plugin
- Create reusable components when appropriate
