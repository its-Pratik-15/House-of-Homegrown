# House of Homegrown

A Direct-to-Consumer (D2C) e-commerce platform celebrating Indian everyday living through sustainable, natural, and locally-made products. Inspired by the fundamental needs of "Roti, Kapda aur Makan" (Food, Clothing, and Shelter), this application showcases modern web development practices while honoring traditional Indian craftsmanship.

## Project Overview

House of Homegrown is a full-stack e-commerce application built to demonstrate modern web development capabilities in the D2C space. The platform focuses on curating and selling sustainable products across four key categories that represent essential aspects of Indian daily life.

### Product Categories

- **Textiles** - Traditional fabrics, clothing, and textile products
- **Home & Living** - Furniture, decor, and household essentials
- **Lifestyle** - Personal accessories and daily-use items
- **Wellness** - Natural health and wellness products

## Key Features

### Frontend Features

- Responsive product catalog with category-based filtering
- Product detail pages with image galleries
- Shopping cart functionality with persistent storage
- Mobile-first responsive design
- Clean, minimal user interface following D2C design principles
- Search functionality across products and categories
- Guest user support with session management

### Backend Features

- RESTful API architecture
- Product and category management
- Inventory tracking system
- Guest session handling with JWT tokens
- Cookie-based session persistence
- Database seeding with sample products
- CORS-enabled API for frontend integration

## Tech Stack

### Frontend

- **React** - Component-based UI library
- **TypeScript** - Type-safe JavaScript development
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Modern React component library
- **lucide-react** - Icon library
- **Axios** - HTTP client for API communication

### Backend

- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **Prisma ORM** - Database toolkit and query builder
- **PostgreSQL** - Relational database
- **cookie-parser** - Cookie parsing middleware

## Entity Relationship (ER) Model

The application uses a relational database structure designed to support e-commerce operations while maintaining data integrity and scalability.

### Core Entities

**User**
- Stores customer information including authentication details
- Fields: id, name, email, password, phone, timestamps

**Category**
- Defines product categories with enum-based types
- Fields: id, name, type (TEXTILES, HOME_LIVING, LIFESTYLE, WELLNESS), timestamps

**Product**
- Central entity containing product information
- Fields: id, title, slug, description, price, mrp, brand, categoryId, timestamps

**ProductImage**
- Manages multiple images per product with ordering
- Fields: id, productId, url, position, timestamps

**Inventory**
- Tracks stock levels and sales data
- Fields: id, productId, stockQuantity, reservedQuantity, soldCount, timestamps

### Key Relationships

- **Category → Products**: One-to-many relationship where each category contains multiple products
- **Product → Images**: One-to-many relationship allowing multiple images per product
- **Product → Inventory**: One-to-one relationship for stock management
- **Product → Category**: Many-to-one relationship linking products to their categories

The Prisma schema serves as the single source of truth for database structure and relationships.

## Project Structure

```
house-of-homegrown/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/          # Reusable components
│   │   │   ├── filters/         # Product filtering components
│   │   │   ├── layout/          # Layout components (Header, Footer)
│   │   │   └── ui/              # shadcn/ui components
│   │   ├── pages/
│   │   │   ├── home/            # Homepage sections
│   │   │   └── products/        # Product-related pages
│   │   ├── services/            # API communication layer
│   │   ├── hooks/               # Custom React hooks
│   │   ├── utils/               # Utility functions
│   │   └── types/               # TypeScript type definitions
│   ├── public/                  # Static assets
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── controllers/         # Request handlers
│   │   ├── services/            # Business logic layer
│   │   ├── middlewares/         # Custom middleware
│   │   └── routes/              # API route definitions
│   ├── prisma/
│   │   ├── schema.prisma        # Database schema
│   │   ├── migrations/          # Database migrations
│   │   └── seed.js              # Sample data seeding
│   ├── server.js                # Application entry point
│   └── package.json
└── README.md
```

## Core Modules

### Product Management
- Product CRUD operations with category association
- Image management with multiple images per product
- Slug-based URL generation for SEO-friendly routes
- Price management with MRP and selling price differentiation

### Category System
- Enum-based category types ensuring data consistency
- Category-based product filtering and organization
- Hierarchical product organization

### Inventory Management
- Real-time stock quantity tracking
- Reserved quantity management for cart items
- Sales analytics with sold count tracking
- Stock availability validation

## Design Philosophy

The application follows D2C design principles emphasizing:

- **Minimalism** - Clean interfaces that highlight products over UI elements
- **Natural Aesthetics** - Earth-tone color palette reflecting sustainable values
- **Mobile-First** - Responsive design prioritizing mobile user experience
- **Performance** - Optimized loading and smooth interactions
- **Accessibility** - Semantic HTML and keyboard navigation support

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- npm or yarn package manager

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
# Create .env file
DATABASE_URL="postgresql://username:password@localhost:5432/house_of_homegrown"
JWT_SECRET="your-jwt-secret-key"
PORT=3001
```

4. Set up the database:
```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Seed sample data
npm run db:seed
```

5. Start the development server:
```bash
npm start
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
# Create .env file
VITE_API_URL=http://localhost:3001/api
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173` with the API running on `http://localhost:3001`.

## API Communication

The frontend communicates with the backend through a RESTful API structure:

### Core Endpoints

- `GET /api/products` - Retrieve products with filtering options
- `GET /api/products/:id` - Get individual product details
- `GET /api/categories` - Fetch all product categories
- `POST /api/cart/items` - Add items to shopping cart
- `GET /api/cart` - Retrieve cart contents

### Request/Response Pattern

All API responses follow a consistent structure:
```json
{
  "success": true,
  "data": {},
  "message": "Optional message"
}
```

Error responses include appropriate HTTP status codes and descriptive error messages.

## Sample Data and Seeding

The application includes a comprehensive seeding script that populates the database with:

- 4 product categories (Textiles, Home & Living, Lifestyle, Wellness)
- 11+ sample products with realistic pricing and descriptions
- Product images with proper positioning
- Inventory data with stock quantities
- Relationships between all entities

Run the seeding script:
```bash
cd backend
npm run db:seed
```

## Future Improvements

- User authentication and account management
- Payment gateway integration
- Order management system
- Product reviews and ratings
- Advanced search with filters
- Wishlist functionality
- Admin dashboard for product management
- Email notifications
- Analytics and reporting
- Multi-language support

## Project Goals

This project demonstrates:

- **Full-stack Development** - Complete frontend and backend implementation
- **Modern React Patterns** - Hooks, context, and component composition
- **Database Design** - Normalized schema with proper relationships
- **API Design** - RESTful endpoints with consistent patterns
- **Type Safety** - TypeScript implementation for better code quality
- **Responsive Design** - Mobile-first approach with modern CSS
- **Code Organization** - Modular architecture with separation of concerns
- **Development Workflow** - Environment configuration and database migrations

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

**House of Homegrown** - Supporting local artisans and sustainable living