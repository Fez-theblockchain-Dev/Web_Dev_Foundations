const { handler } = require('@netlify/functions');
const { Pool } = require('pg');
const dotenv = require('dotenv').config();


// Database connection configuration
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    require: true,
    port: 5432,
  }
});

// Real database functions 
const db = {
  fetchActiveUsers: async () => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM users WHERE status = $1', ['active']);
      client.release();
      return result.rows;
    } catch (error) {
      console.error('Database error:', error);
      return [];
    }
  },
  
  addUser: async (userData) => {
    try {
      const client = await pool.connect();
      const result = await client.query(
        'INSERT INTO users (name, email, status) VALUES ($1, $2, $3) RETURNING *',
        [userData.name, userData.email, 'active']
      );
      client.release();
      return result.rows[0];
    } catch (error) {
      console.error('Database error:', error);
      throw error;
    }
  },
  
  addNewsletterSubscriber: async (subscriberData) => {
    try {
      const client = await pool.connect();
      const result = await client.query(
        'INSERT INTO newsletter_subscribers (name, email, fitness_level, consent, subscribed_at, source) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [subscriberData.name, subscriberData.email, subscriberData.fitnessLevel, subscriberData.consent, subscriberData.subscribedAt, subscriberData.source]
      );
      client.release();
      return result.rows[0];
    } catch (error) {
      console.error('Database error:', error);
      throw error;
    }
  },
  
  addContactSubmission: async (contactData) => {
    try {
      const client = await pool.connect();
      const result = await client.query(
        'INSERT INTO contact_submissions (name, email, message, status) VALUES ($1, $2, $3, $4) RETURNING *',
        [contactData.name, contactData.email, contactData.message, 'new']
      );
      client.release();
      return result.rows[0];
    } catch (error) {
      console.error('Database error:', error);
      throw error;
    }
  }
};

const analyticsService = {
  getSiteMetrics: async () => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT COUNT(*) as total_users FROM users');
      const userCount = parseInt(result.rows[0].total_users);
      client.release();
      
      return {
        pageViews: 1500,
        uniqueVisitors: 450,
        conversionRate: 0.15,
        totalUsers: userCount
      };
    } catch (error) {
      console.error('Analytics error:', error);
      return {
        pageViews: 1500,
        uniqueVisitors: 450,
        conversionRate: 0.15,
        totalUsers: 0
      };
    }
  }
};

exports.handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  try {
    const path = event.path.replace('/.netlify/functions/api', '');
    
    switch (path) {
      case '/':
      case '':
        if (event.httpMethod === 'GET') {
          return {
            statusCode: 200,
            headers: {
              ...headers,
              'Content-Type': 'text/plain'
            },
            body: 'Hello World'
          };
        }
        break;
        
      case '/home':
        if (event.httpMethod === 'POST') {
          const body = JSON.parse(event.body || '{}');
          
          // Simulate your original server logic
          const [users, stats] = await Promise.all([
            db.fetchActiveUsers(),
            analyticsService.getSiteMetrics()
          ]);
          
          return {
            statusCode: 200,
            headers: {
              ...headers,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ users, stats })
          };
        }
        break;
        
      case '/newsletter':
        if (event.httpMethod === 'POST') {
          try {
            const body = JSON.parse(event.body || '{}');
            const subscriber = await db.addNewsletterSubscriber(body);
            
            return {
              statusCode: 201,
              headers: {
                ...headers,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ 
                success: true, 
                message: 'Newsletter subscription successful',
                subscriber 
              })
            };
          } catch (error) {
            console.error('Newsletter subscription error:', error);
            return {
              statusCode: 500,
              headers: {
                ...headers,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ 
                success: false, 
                error: 'Failed to subscribe to newsletter' 
              })
            };
          }
        }
        break;
        
      case '/contact':
        if (event.httpMethod === 'POST') {
          try {
            const body = JSON.parse(event.body || '{}');
            const contact = await db.addContactSubmission(body);
            
            return {
              statusCode: 201,
              headers: {
                ...headers,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ 
                success: true, 
                message: 'Contact form submitted successfully',
                contact 
              })
            };
          } catch (error) {
            console.error('Contact submission error:', error);
            return {
              statusCode: 500,
              headers: {
                ...headers,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ 
                success: false, 
                error: 'Failed to submit contact form' 
              })
            };
          }
        }
        break;
        
      case '/users':
        if (event.httpMethod === 'POST') {
          try {
            const body = JSON.parse(event.body || '{}');
            const user = await db.addUser(body);
            
            return {
              statusCode: 201,
              headers: {
                ...headers,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ 
                success: true, 
                message: 'User created successfully',
                user 
              })
            };
          } catch (error) {
            console.error('User creation error:', error);
            return {
              statusCode: 500,
              headers: {
                ...headers,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ 
                success: false, 
                error: 'Failed to create user' 
              })
            };
          }
        }
        break;
        
      default:
        return {
          statusCode: 404,
          headers: {
            ...headers,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ error: 'Endpoint not found' })
        };
    }
  } catch (error) {
    console.error('Function error:', error);
    return {
      statusCode: 500,
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
}; 


