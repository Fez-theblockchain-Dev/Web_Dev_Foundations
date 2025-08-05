const { handler } = require('@netlify/functions');

// Mock database functions (replace with your actual database logic)
const mockDb = {
  fetchActiveUsers: async () => {
    // Simulate database call
    return [
      { id: 1, name: 'John Doe', status: 'active' },
      { id: 2, name: 'Jane Smith', status: 'active' }
    ];
  }
};

const mockAnalyticsService = {
  getSiteMetrics: async () => {
    // Simulate analytics call
    return {
      pageViews: 1500,
      uniqueVisitors: 450,
      conversionRate: 0.15
    };
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
            mockDb.fetchActiveUsers(),
            mockAnalyticsService.getSiteMetrics()
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