# Geochem Foods Express

## Overview
Geochem Foods Express is an e-commerce website for hygienically processed Nigerian food products. The platform features a marketplace for selling premium Nigerian food items, user authentication via Firebase, and a clean, modern interface.

**Project Type:** Static HTML/CSS/JavaScript Website  
**Tech Stack:** HTML5, TailwindCSS (CDN), JavaScript (ES6 modules), Firebase (Auth & Firestore)  
**Server:** Node.js with http-server  
**Port:** 5000

## Recent Changes
- **October 29, 2025**: Initial Replit setup completed
  - Installed Node.js 20 and http-server package
  - Configured workflow to serve static site on port 5000 with CORS and disabled caching
  - Set up deployment configuration for autoscale deployment
  - Created .gitignore for Node.js projects

## Project Structure
```
/
├── assets/
│   ├── css/
│   │   └── sweetalert-responsive.css
│   └── js/
│       ├── auth-firebase.js       # Firebase authentication logic
│       ├── auth.js                # Authentication helper functions
│       ├── firebase-config.js      # Firebase configuration
│       ├── main.js                # Main site functionality
│       └── ui-enhancements.js     # UI interactions
├── *.html                         # Various page templates
├── FIRESTORE_SECURITY_RULES.txt  # Security rules documentation
├── package.json                   # Node.js dependencies
└── pnpm-lock.yaml                 # Package lock file
```

## Key Features
- **Authentication**: Firebase Auth with email/password and social login
- **Product Catalog**: Browse Nigerian food products by category
- **User Profiles**: Authenticated users can access marketplace, analytics, and settings
- **Shopping Cart**: Add items to cart and checkout
- **Admin Dashboard**: Manage products and orders (admin-dashboard.html)
- **Blog**: Content marketing for products
- **Contact Form**: Customer support

## Firebase Integration
The website uses Firebase for:
- **Authentication** (Firebase Auth)
- **Database** (Cloud Firestore)
- **Analytics** (Firebase Analytics)

Firebase configuration is located in `assets/js/firebase-config.js` with project ID: `geochem-food-express`

## Running Locally
The website is served using http-server with:
- Host: 0.0.0.0 (allows Replit proxy to work)
- Port: 5000
- Cache disabled (-c-1) for development
- CORS enabled for Firebase integration

The workflow automatically starts when you run the Repl.

## Deployment
The project is configured for **autoscale deployment** using Replit Deployments:
- Deployment runs `npx http-server . -p 5000`
- Autoscale is suitable for this stateless static website
- Firebase handles all backend functionality

## Pages
- `index.html` - Homepage with hero, categories, and testimonials
- `shop.html` - Product browsing
- `marketplace.html` - Authenticated user marketplace
- `login.html` / `signup.html` - Authentication pages
- `profile.html` - User profile management
- `cart.html` / `checkout.html` - Shopping flow
- `admin-dashboard.html` / `admin-login.html` - Admin panel
- `about.html` / `why-us.html` - Company information
- `blog.html` - Blog content
- `contact.html` - Contact form
- `settings.html` - User settings
- `analytics.html` - User analytics dashboard

## Notes
- The site uses Tailwind CSS from CDN (not recommended for production per Tailwind docs)
- All external resources (images) are hosted on Vercel Blob Storage
- Firebase API keys are public (normal for Firebase client apps)
- Security is managed via Firestore Security Rules (see FIRESTORE_SECURITY_RULES.txt)
