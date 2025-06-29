# BoxMedia Portfolio Website

## Overview

This is a full-stack web application featuring a retro-futuristic portfolio website for BoxMedia, a digital agency. The project is built with a modern React frontend and Express.js backend, utilizing TypeScript throughout. The application showcases a terminal-inspired design with a monospace aesthetic, featuring sections for portfolio, services, skills, team, testimonials, and contact information.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **UI Components**: Radix UI components via shadcn/ui library
- **State Management**: React hooks and context for local state
- **Data Fetching**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM with PostgreSQL support
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Session Management**: PostgreSQL-backed sessions via connect-pg-simple
- **Development**: Hot reloading with tsx for server-side TypeScript execution

### Design System
- **Theme**: Retro-futuristic terminal aesthetic with monospace fonts
- **Color Scheme**: Black and white with grayscale accents, terminal green highlights
- **Components**: Highly customizable UI components with consistent theming
- **Responsive**: Mobile-first design with Tailwind breakpoints
- **Accessibility**: ARIA labels, keyboard navigation, high contrast ratios

## Key Components

### Frontend Components
- **BoxMediaPortfolio**: Main portfolio component with sections for hero, portfolio, services, skills, team, testimonials, and contact
- **UI Components**: Complete set of accessible components (buttons, cards, forms, navigation, etc.)
- **Theming**: Dark/light mode support with CSS custom properties
- **Animations**: CSS-based animations for typewriter effects, hover states, and section transitions

### Backend Services
- **Storage Interface**: Abstracted storage layer with in-memory implementation for development
- **User Management**: Basic user CRUD operations with username/password schema
- **Route Registration**: Modular route system for API endpoints
- **Middleware**: Request logging, error handling, and session management

### Shared Schema
- **Database Schema**: Drizzle schema definitions for PostgreSQL tables
- **Type Safety**: Shared TypeScript types between frontend and backend
- **Validation**: Zod schemas for runtime type validation

## Data Flow

1. **Client Requests**: Frontend makes HTTP requests to `/api` endpoints
2. **Server Processing**: Express.js handles requests with middleware pipeline
3. **Database Operations**: Drizzle ORM manages PostgreSQL interactions
4. **Response Handling**: TanStack Query manages client-side caching and state
5. **UI Updates**: React components re-render based on query state changes

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL client for Neon Database
- **@tanstack/react-query**: Server state management and caching
- **@radix-ui/react-***: Accessible UI primitive components
- **drizzle-orm**: Type-safe PostgreSQL ORM
- **express**: Web application framework
- **react**: Frontend library
- **tailwindcss**: Utility-first CSS framework
- **typescript**: Type safety and development experience

### Development Tools
- **vite**: Build tool and dev server
- **tsx**: TypeScript execution for Node.js
- **drizzle-kit**: Database migration and introspection tools
- **@replit/vite-plugin-***: Replit-specific development enhancements

## Deployment Strategy

### Development Environment
- **Frontend**: Vite dev server with hot module replacement
- **Backend**: tsx with automatic restart on file changes
- **Database**: Neon Database connection via environment variables
- **Build Process**: TypeScript compilation with esbuild for server, Vite for client

### Production Build
- **Client Build**: `vite build` creates optimized static assets
- **Server Build**: `esbuild` bundles server code into single ESM file
- **Static Serving**: Express serves built client assets in production
- **Environment**: Production mode with optimized configurations

### Database Management
- **Migrations**: Drizzle Kit manages schema migrations
- **Schema Sync**: `db:push` command for development schema updates
- **Connection**: Environment variable-based database URL configuration

## Changelog

```
Changelog:
- June 29, 2025. Initial setup with React/Express full-stack
- June 29, 2025. Converted to pure frontend HTML/CSS/JavaScript at user request
- June 29, 2025. Fixed cursor visibility issues for mobile and desktop
- June 29, 2025. Created complete portfolio website with Arabic RTL support
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```