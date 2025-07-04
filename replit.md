# Carbon Emission Calculator

## Overview

This is a full-stack web application for calculating carbon emissions for both personal and industrial use. The application provides comprehensive insights, GHG Protocol compliance, and detailed emission analysis. It features a React frontend with TypeScript, an Express.js backend, and uses PostgreSQL with Drizzle ORM for data persistence.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Framework**: Tailwind CSS with shadcn/ui components
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for client-side routing
- **Form Handling**: React Hook Form with Zod validation
- **Charts**: Recharts for data visualization
- **Animations**: Framer Motion for smooth transitions

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Session Management**: PostgreSQL session store
- **API Design**: RESTful API with JSON responses
- **Development**: Hot reloading with Vite integration

### Data Layer
- **ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL (configured for Neon Database)
- **Migrations**: Drizzle Kit for schema management
- **Validation**: Zod schemas for runtime type checking

## Key Components

### Database Schema
The application uses three main database tables:
- **users**: User authentication and profile data
- **personalEmissions**: Individual carbon footprint calculations
- **industrialEmissions**: Enterprise-level emission calculations with GHG Protocol scopes

### Calculation Engine
- **Personal Emissions**: Calculates based on electricity usage, transportation, flights, diet, and shopping habits
- **Industrial Emissions**: Calculates Scope 1, 2, and 3 emissions following GHG Protocol standards
- **Emission Factors**: Compliant with GHG Protocol using country-specific grid factors

### Advanced Features
- **Forecast Generation**: Time-series prediction for emission trends
- **Optimization Suggestions**: Automated recommendations for emission reduction
- **Risk Assessment**: Identifies high-impact emission categories

### User Interface
- **Landing Page**: Educational content about carbon accounting and emission scopes
- **Calculator Forms**: Separate interfaces for personal and industrial calculations
- **Results Dashboard**: Visual charts and AI-powered insights
- **Responsive Design**: Mobile-first approach with adaptive layouts

## Data Flow

1. **User Input**: Forms capture emission data with real-time validation
2. **API Processing**: Backend calculates emissions using scientific factors
3. **Database Storage**: Results are persisted with user associations
4. **AI Analysis**: Mock AI services generate forecasts and recommendations
5. **Visualization**: Results are displayed with interactive charts
6. **External Integration**: Action buttons link to external carbon management platforms

## External Dependencies

### Core Libraries
- **@neondatabase/serverless**: PostgreSQL connection for serverless environments
- **drizzle-orm**: Type-safe database operations
- **@tanstack/react-query**: Server state management
- **react-hook-form**: Form handling with validation
- **recharts**: Data visualization components
- **framer-motion**: Animation library

### UI Components
- **@radix-ui**: Accessible component primitives
- **tailwindcss**: Utility-first CSS framework
- **shadcn/ui**: Pre-built component library
- **lucide-react**: Icon library

### Development Tools
- **tsx**: TypeScript execution for Node.js
- **vite**: Build tool and development server
- **esbuild**: Fast JavaScript bundler for production

## Deployment Strategy

### Development Environment
- **Frontend**: Vite dev server with HMR
- **Backend**: Express server with TypeScript execution
- **Database**: PostgreSQL connection via environment variables

### Production Build
- **Frontend**: Static assets built with Vite
- **Backend**: Bundled with esbuild for Node.js deployment
- **Database**: Migrations applied via Drizzle Kit

### Environment Configuration
- **DATABASE_URL**: PostgreSQL connection string
- **NODE_ENV**: Environment flag for production optimizations
- **REPL_ID**: Replit-specific configuration for development

### External Integrations
- **Carbon Dashboard**: https://karbon-compass.netlify.app/
- **Carbon Offset Registry**: https://carbonica-ledger.netlify.app/

## Changelog

- July 04, 2025: Initial setup
- July 04, 2025: Enhanced application with comprehensive improvements:
  - Fixed industrial calculator validation issues
  - Added 50+ countries to country selection list (from 6 to 56 countries)
  - Added waste calculation to personal carbon footprint with weekly waste input
  - Enhanced emission factors with comprehensive country-specific data
  - Added detailed visual explanations for all charts and graphs
  - Created comprehensive bar chart for category-wise emission analysis
  - Added performance assessment with benchmarking against global/industry averages
  - Enhanced optimization recommendations with waste reduction suggestions
  - Added detailed insights component with action priorities
  - Improved chart tooltips and explanations for better user understanding
  - Enhanced forecast visualization with axis labels and methodology explanations
  - Improved pie chart visualization with better labeling and donut chart style
  - Removed carbon dashboard and offset registry external links from personal calculator
  - Removed all AI references from the application interface and documentation
  - Replaced with "optimization recommendations" and "automated suggestions" terminology

## User Preferences

Preferred communication style: Simple, everyday language.