# 🏢 HR Management System

<div align="center">

![HR Management System](https://via.placeholder.com/800x400/2563eb/ffffff?text=HR+Management+System+Logo)

[![NestJS](https://img.shields.io/badge/NestJS-11.0.1-red.svg)](https://nestjs.com/)
[![React](https://img.shields.io/badge/React-19.1.0-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue.svg)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.16.1-green.svg)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.11-38bdf8.svg)](https://tailwindcss.com/)

**A modern, full-stack HR management system built with NestJS and React**

</div>

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Screenshots](#screenshots)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
- [Development](#development)
- [Deployment](#deployment)
- [Contributing](#contributing)

## 🎯 Overview

The HR Management System is a comprehensive solution designed to streamline human resources operations, from recruitment and candidate management to employee lifecycle management. Built with modern technologies, it provides a robust, scalable, and user-friendly platform for HR professionals.

### Key Benefits

- **Streamlined Recruitment**: Manage job postings, track candidates, and streamline the hiring process
- **Employee Management**: Comprehensive employee directory with performance tracking
- **Role-Based Access Control**: Secure, permission-based system for different user roles
- **Modern UI/UX**: Intuitive interface built with React and Tailwind CSS
- **Scalable Architecture**: Microservices-based backend with MongoDB
- **Multi-language Support**: Internationalization (i18n) support for global teams

## ✨ Features

### 🔐 Authentication & Security
- JWT-based authentication with refresh tokens
- Role-based access control (RBAC) with 6 user roles
- Password hashing with Argon2
- Comprehensive permission system (22 granular permissions)
- Rate limiting and security headers

### 👥 User Management
- Comprehensive user profiles with personal, employment, and contact information
- Avatar upload and management
- User preferences and settings
- Emergency contact management
- Employment history tracking

### 🏢 Organization Structure
- Department and team management
- Organizational hierarchy visualization
- Position and role definitions
- Budget and location tracking

### 👨‍💼 Employee Management
- Employee onboarding workflows
- Performance review system
- Document management
- Leave management
- Skills and certification tracking

### 📋 Recruitment & Hiring
- Job posting creation and management
- Candidate pipeline management
- Application tracking system (ATS)
- Interview scheduling
- Resume parsing and storage

### 📊 Dashboard & Analytics
- Real-time metrics and KPIs
- Performance analytics
- Recruitment funnel visualization
- Employee statistics
- Customizable widgets

### 📁 File Management
- Secure file upload system
- Document categorization
- Access control and permissions
- Multiple file type support

### 🌐 Internationalization
- Multi-language support (English, Vietnamese)
- Localized content and interfaces
- Cultural adaptation features

## 🛠️ Tech Stack

### Backend
- **Framework**: [NestJS](https://nestjs.com/) 11.0.1
- **Language**: [TypeScript](https://www.typescriptlang.org/) 5.7.3
- **Database**: [MongoDB](https://www.mongodb.com/) 8.16.1 with Mongoose ODM
- **Authentication**: JWT with Passport.js
- **Validation**: Class-validator & class-transformer
- **Documentation**: Swagger/OpenAPI
- **Logging**: Pino with structured logging
- **Email**: Nodemailer with Handlebars templates
- **Caching**: Redis with BullMQ for background jobs
- **Testing**: Jest with E2E testing support

### Frontend
- **Framework**: [React](https://reactjs.org/) 19.1.0
- **Language**: [TypeScript](https://www.typescriptlang.org/) 5.8.3
- **Routing**: [TanStack Router](https://tanstack.com/router)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) 4.1.11
- **Data Fetching**: [TanStack Query](https://tanstack.com/query)
- **Forms**: [React Hook Form](https://react-hook-form.com/) with Zod validation
- **Internationalization**: [i18next](https://www.i18next.com/)
- **Build Tool**: [Vite](https://vitejs.dev/) 6.3.5

### DevOps & Tools
- **Package Manager**: [pnpm](https://pnpm.io/)
- **Code Quality**: ESLint, Prettier
- **Version Control**: Git
- **Containerization**: Docker with docker-compose
- **Environment**: Node.js 18+

## 📁 Project Structure

```
hr-management/
├── backend/                 # NestJS Backend API
│   ├── src/
│   │   ├── api/            # API Modules
│   │   │   ├── auth/       # Authentication & Authorization
│   │   │   ├── user/       # User Management
│   │   │   ├── employee/   # Employee Management
│   │   │   ├── organization/ # Organization Structure
│   │   │   ├── roles/      # Role-Based Access Control
│   │   │   ├── files/      # File Management
│   │   │   └── time-management/ # Time Tracking
│   │   ├── common/         # Shared DTOs, Entities, Interfaces
│   │   ├── config/         # Configuration Management
│   │   ├── database/       # Database Configuration
│   │   ├── guards/         # Authentication Guards
│   │   ├── decorators/     # Custom Decorators
│   │   ├── filters/        # Exception Filters
│   │   ├── mail/           # Email Service
│   │   ├── redis/          # Redis Configuration
│   │   └── utils/          # Utility Functions
│   ├── test/               # E2E Tests
│   └── docker-compose.yml  # Docker Configuration
│
├── frontend/               # React Frontend Application
│   ├── src/
│   │   ├── components/     # Reusable UI Components
│   │   ├── features/       # Feature-based Modules
│   │   │   ├── auth/       # Authentication
│   │   │   ├── dashboard/  # Dashboard & Analytics
│   │   │   ├── employee/   # Employee Management
│   │   │   ├── user/       # User Management
│   │   │   └── time-management/ # Time Tracking
│   │   ├── hooks/          # Custom React Hooks
│   │   ├── lib/            # Utilities & API Client
│   │   ├── routes/         # Application Routes
│   │   ├── stores/         # State Management
│   │   └── types/          # TypeScript Type Definitions
│   ├── public/             # Static Assets
│   └── vite.config.ts      # Vite Configuration
│
└── README.md               # This File
```

## 🖼️ Screenshots

### Dashboard Overview
![Dashboard](https://via.placeholder.com/1200x600/1f2937/ffffff?text=Dashboard+Overview+%7C+HR+Analytics+%26+KPIs)

### Employee Management
![Employee Management](https://via.placeholder.com/1200x600/059669/ffffff?text=Employee+Directory+%7C+Profile+Management+%26+Performance+Tracking)

### Recruitment Pipeline
![Recruitment](https://via.placeholder.com/1200x600/7c3aed/ffffff?text=Recruitment+Pipeline+%7C+Candidate+Tracking+%26+Interview+Management)

### Organization Structure
![Organization](https://via.placeholder.com/1200x600/dc2626/ffffff?text=Organization+Chart+%7C+Department+%26+Team+Management)

### User Interface
![UI Components](https://via.placeholder.com/1200x600/ea580c/ffffff?text=Modern+UI+Components+%7C+Responsive+Design+%26+Accessibility)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and pnpm
- MongoDB 6.0+
- Redis 6.0+
- Docker and Docker Compose (optional)

#### Backend Setup

1. **Install dependencies**
   ```bash
   cd backend
   pnpm install
   ```

2. **Configure environment**
   ```bash
   cp env.example .env
   # Configure MongoDB, Redis, JWT secrets, etc.
   ```

3. **Start MongoDB and Redis**
   ```bash
   # Start MongoDB service
   # Start Redis service
   ```

4. **Run database migrations**
   ```bash
   pnpm run start:dev
   ```

#### Frontend Setup

1. **Install dependencies**
   ```bash
   cd frontend
   pnpm install
   ```

2. **Configure API endpoint**
   ```bash
   # Update API base URL in src/lib/api-client.ts
   ```

3. **Start development server**
   ```bash
   pnpm run dev
   ```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Run tests**
   ```bash
   pnpm run test
   pnpm run lint
   ```
5. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
6. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

### Development Guidelines

- Follow the existing code style and conventions
- Write meaningful commit messages
- Include tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

## 📊 Project Status

### ✅ Completed Features
- Authentication & Authorization system
- User management with comprehensive profiles
- Role-based access control (RBAC)
- Organization structure management
- File upload and management system
- Multi-language support (i18n)
- API documentation with Swagger
- Basic employee management structure

### 🔄 In Progress
- Enhanced employee management system
- Performance tracking and reviews
- Document management workflows

### 📋 Planned Features
- Advanced recruitment pipeline
- Candidate management system
- Interview scheduling
- Analytics and reporting dashboard
- Calendar integration
- Mobile application

## 🐛 Known Issues

- None currently reported

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/ngocla99/hr-management/issues)
- **Discussions**: [GitHub Discussions](https://github.com/ngocla99/hr-management/discussions)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [NestJS](https://nestjs.com/) - Progressive Node.js framework
- [React](https://reactjs.org/) - JavaScript library for building user interfaces
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - Beautifully designed components
- [MongoDB](https://www.mongodb.com/) - Document database
- [Redis](https://redis.io/) - In-memory data structure store

---

<div align="center">

**Built with ❤️ by the HR Management Team**

![Made with Love](https://via.placeholder.com/200x50/ef4444/ffffff?text=Made+with+❤️)

</div>
