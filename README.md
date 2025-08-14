# ABC Fitness Health Studio - Web Development Project

## Project Overview
A modern, responsive fitness website built with HTML, CSS, JavaScript, and connected to a Neon PostgreSQL database. This project demonstrates full-stack web development skills including frontend design, backend API development, and database integration.

## Features
- **Responsive Design**: Mobile-friendly layout with modern CSS
- **Interactive Slideshow**: Image carousel using Swiper.js
- **Newsletter Subscription**: Real-time database integration
- **Contact Forms**: Database-backed form submissions
- **E-commerce Elements**: Shopping cart functionality
- **Serverless Backend**: Netlify Functions with PostgreSQL database

## Technology Stack
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Netlify Functions (Node.js)
- **Database**: Neon PostgreSQL
- **External APIs**: Calendly integration
- **Libraries**: Swiper.js for carousel functionality

## Database Integration
- Connected to Neon PostgreSQL database
- Real-time data storage for newsletter subscriptions
- User management system
- Contact form submissions
- Analytics tracking

## Project Structure
```
Sophia_webDevFoundations_Project/
├── assets/                 # Images and media files
├── javascript/            # Frontend JavaScript files
│   ├── api.js            # API integration
│   ├── base.js           # Core functionality
│   ├── customInquiry.js  # Contact form handling
│   ├── newsletter.js     # Newsletter component
│   └── swiper.js         # Carousel functionality
├── netlify/
│   └── functions/        # Serverless backend
│       └── api.js        # Database API endpoints
├── styles/
│   └── styles.css        # Main stylesheet
├── *.html                # Website pages
└── netlify.toml          # Deployment configuration
```

## Live Demo
[Add your Netlify deployment URL here]

## Database Schema
- **users**: User account management
- **newsletter_subscribers**: Email subscription tracking
- **contact_submissions**: Contact form data storage

## API Endpoints
- `POST /api/home` - Home page data
- `POST /api/newsletter` - Newsletter subscriptions
- `POST /api/contact` - Contact form submissions
- `POST /api/users` - User management

## Setup Instructions
1. Clone the repository
2. Install dependencies: `npm install` (in netlify/functions/)
3. Set up environment variables in Netlify dashboard
4. Deploy to Netlify

## Author
[Your Name] - Web Development Foundations Project

## Course Information
This project was created for [Course Name] at [Institution Name] as a demonstration of modern web development practices and database integration.
