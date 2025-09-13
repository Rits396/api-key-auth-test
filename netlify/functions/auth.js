exports.handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, X-Api-Key',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle OPTIONS request (CORS preflight)
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  try {
    // Get headers from the event
    const requestHeaders = event.headers || {};
    
    // Check for X-Api-Key header (case-insensitive)
    const apiKey = requestHeaders['x-api-key'] || requestHeaders['X-Api-Key'];
    
    // Check if API key matches
    const isAuthorized = apiKey === 'my-secret-key';
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        authorized: isAuthorized
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Internal server error'
      })
    };
  }
};
