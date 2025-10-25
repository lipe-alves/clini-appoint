# Healthcare API Server

## Overview
This is a Firebase Functions-based Express API server for a healthcare management system. The application provides REST API endpoints for managing specialties, appointments, exams, health professionals, patients, care units, and clinics.

**Current State:** The project has been configured to run on Replit. The server is running on port 5000 and is accessible through the Replit webview.

## Recent Changes (October 25, 2025)
- Configured project for Replit environment
- Created standalone development server (`server/src/server.ts`) for local development
- Fixed TypeScript compilation build script to use `npx tsc`
- Fixed path alias resolution in the build process
- Created mock Firebase service account for development
- Added `.gitignore` for Node.js and Firebase artifacts
- Set up workflow to run server on port 5000
- Server successfully tested with `/v1/tests/ping` and `/v1/specialties` endpoints

## Project Architecture

### Technology Stack
- **Runtime:** Node.js 22
- **Language:** TypeScript 5.7.3
- **Framework:** Express 5.1.0
- **Backend Service:** Firebase Admin SDK 12.6.0
- **Database:** Firestore (via Firebase)

### Directory Structure
```
server/
├── src/
│   ├── core/           # Core framework classes (Controller, Model, Repository, Router, etc.)
│   ├── modules/        # Feature modules (appointments, patients, specialties, etc.)
│   ├── shared/         # Shared utilities, DTOs, errors, types
│   ├── configs/        # Configuration files (service account)
│   ├── app.ts          # Express app configuration
│   ├── index.ts        # Firebase Functions entry point
│   └── server.ts       # Standalone server for development
├── scripts/            # Build scripts
├── build/             # Compiled JavaScript output (gitignored)
└── package.json       # Dependencies and scripts
```

### Available Modules
- **Appointments:** Appointment management
- **Care Units:** Care units and rooms management
- **Clinics:** Clinic management
- **Exams:** Exam and exam request management
- **Health Professionals:** Physicians, nutritionists, physical therapists, psychologists
- **Patients:** Patient management
- **Specialties:** Medical specialties (CRUD operations implemented)
- **Tests:** Testing utilities and health check endpoints

## API Endpoints

### Health Check
- `GET /v1/tests/ping` - Returns server status and request information

### Specialties
- `GET /v1/specialties` - Get list of specialties (requires `filters` query parameter)
- `POST /v1/specialties` - Create a new specialty

## Development

### Running the Server
The server runs automatically via the configured workflow. To manually restart:
```bash
cd server && npm run dev
```

### Build Process
The custom build script:
1. Cleans the `build` directory
2. Copies config files from `src/configs` to `build/configs`
3. Compiles TypeScript using `npx tsc`
4. Resolves TypeScript path aliases (`@root/*`) to relative paths

### Scripts
- `npm run dev` - Build and start development server
- `npm run build` - Build TypeScript to JavaScript
- `npm run build:watch` - Watch mode compilation

## Configuration

### Firebase Setup
The project uses a mock Firebase service account for development located at:
- `server/src/configs/service-account.json` (gitignored)

**Note:** For production use, you'll need to replace this with a real Firebase service account credential file.

### Environment Variables
- `PORT` - Server port (defaults to 5000)

### TypeScript Path Aliases
The project uses the `@root/*` alias which maps to `./src/*`:
```typescript
import Router from "@root/core/Router";
import { Route } from "@root/shared/types/index";
```

The build script automatically resolves these to relative paths in the compiled output.

## Architecture Patterns

### Core Framework
The application uses a custom MVC-like framework with:
- **Controller:** Base class for handling HTTP requests
- **Service:** Business logic layer
- **Repository:** Data access layer (Firestore)
- **Model:** Data models with Firestore integration
- **Router:** Custom router that maps routes to controller methods
- **Schema:** Input validation
- **DTOs:** Data transfer objects for request/response

### Error Handling
Custom error classes in `shared/errors/`:
- `DuplicatedRegister`
- `InvalidInputFormat`
- `RequiredField`
- `ResourceNotFound`

Errors return structured JSON responses with error codes, messages, and stack traces.

## User Preferences
- Standard TypeScript/Node.js conventions
- Express-based REST API architecture
- Firebase/Firestore for data persistence

## Notes
- This is a backend API only (no frontend)
- The server is accessible on port 5000
- Firebase Functions setup exists but is not used in Replit dev environment
- The standalone server (`server.ts`) is used instead of Firebase Functions locally
