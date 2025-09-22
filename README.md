# Micro Frontend Application with Module Federation

A scalable micro frontend application built with React and Module Federation, featuring authentication, dashboard, and profile management.

## 🏗️ Architecture

```
MF-MONOLITH-NPM/
├── apps/
│   ├── shared/          # Shared state management (Port 3004)
│   ├── auth/           # Authentication module (Port 3001)
│   ├── dashboard/      # Dashboard module (Port 3002)
│   ├── profile/        # Profile management (Port 3003)
│   └── host/           # Host application (Port 3000)
├── scripts/
└── package.json
```

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm 8+

### Installation
```bash
# Install all dependencies
npm run install:all

# Start all applications
npm run start:dev
```

### Access the Application
Open http://localhost:3000 in your browser

## 🔧 Development Commands

```bash
# Start all services
npm run start:dev

# Start individual services
npm run start:shared
npm run start:auth
npm run start:dashboard
npm run start:profile
npm run start:host

# Build for production
npm run build:all
```

## 📱 Features

### 🔐 Authentication
- Form validation with error handling
- Automatic avatar generation
- Session persistence across modules

### 📊 Dashboard
- Interactive sidebar navigation
- Real-time statistics display
- User profile integration
- Multiple dashboard sections

### 👤 Profile Management
- View/edit personal information
- Form validation and state management
- User statistics display
- Seamless navigation back to dashboard

## 🔄 Application Flow

### 1. Login Process
1. User enters credentials in auth form
2. Form validation occurs client-side
3. Successful login triggers state update
4. Application automatically navigates to dashboard

### 2. Navigation
- **Dashboard → Profile**: Click "Profile" button
- **Profile → Dashboard**: Click "Back to Dashboard"
- **Any Module → Auth**: Click "Logout" (with confirmation)

### 3. State Management
- Centralized state store using event-driven pattern
- SessionStorage persistence for page refreshes
- Automatic state synchronization across modules

## 🛠️ Technical Details

### Module Federation Configuration
Each micro frontend is configured as an independent application that can be developed, deployed, and scaled separately.

### Ports Used
- **Host**: 3000 (Main application)
- **Auth**: 3001 (Authentication)
- **Dashboard**: 3002 (Dashboard)
- **Profile**: 3003 (Profile management)
- **Shared**: 3004 (Shared utilities)

### State Management
- **Store**: Event-driven singleton pattern
- **Hook**: React integration with useAppState
- **Persistence**: SessionStorage for cross-module communication
- **Updates**: Automatic re-renders on state changes

## 📝 Development Notes

- The application uses sessionStorage for state persistence
- All modules share React dependencies as singletons
- Error boundaries handle micro frontend loading failures
- Console logging is enabled for debugging state changes

## 🎯 Production Deployment

```bash
# Build all modules
npm run build:all

# This will:
# 1. Build shared utilities
# 2. Build all remote modules
# 3. Copy remote assets to host
# 4. Build host application
```

The built files will be in each app's `dist` folder, with the host containing all necessary remote assets.