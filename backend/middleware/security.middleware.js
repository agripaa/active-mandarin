const cors = require('cors');
const helmet = require('helmet');

// CORS Configuration
const corsOptions = {
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// CORS Middleware
exports.enableCORS = cors(corsOptions);

exports.setSecurityHeaders = (req, res, next) => {
  // Setting up the security headers
  helmet({
    contentSecurityPolicy: false,
    frameguard: { action: 'deny' }, 
    xssFilter: true,  
    noSniff: true,
    hsts: { maxAge: 31536000, includeSubDomains: true, preload: true }, 
    referrerPolicy: { policy: 'strict-origin-when-cross-origin' }, 
  });
  
  next();
};