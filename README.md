// README.md (NEW FILE)
# Micro Frontend Monolithic Architecture

This project demonstrates a modular monolithic React architecture using Module Federation.

## Architecture Overview

- **Host App** (Port 3000): Main shell application that orchestrates micro frontends
- **Auth App** (Port 3001): Authentication module
- **Dashboard App** (Port 3002): Dashboard functionality module

## Getting Started

### Prerequisites
- Node.js >= 16
- npm >= 8

### Installation
```bash
npm run install:all
```

### Development
```bash
# Start all applications in development mode
npm run start:dev

# Or start individually
npm run start:host
npm run start:auth  
npm run start:dashboard
```

### Production Build
```bash
npm run build:all
```

### Individual Commands
```bash
# Build only remote applications
npm run build:remotes

# Build individual apps
npm run build:auth
npm run build:dashboard
npm run build:host
```

## Features

- ✅ Error boundaries for micro frontend failures
- ✅ Loading states for async module loading
- ✅ Shared dependencies (React, React-DOM, React-Router)
- ✅ Hot module replacement in development
- ✅ Production build optimization
- ✅ Consistent styling across modules

## Architecture Benefits

1. **Independent Development**: Teams can work on modules independently
2. **Shared Dependencies**: Avoids duplication of React libraries
3. **Graceful Degradation**: Error boundaries prevent full app crashes
4. **Scalable**: Easy to add new micro frontends
5. **Maintainable**: Clear separation of concerns

## Troubleshooting

### Common Issues:
1. **Port conflicts**: Ensure ports 3000, 3001, 3002 are available
2. **Build failures**: Run `npm run clean` and reinstall dependencies
3. **Module not found**: Verify all apps are running in development mode