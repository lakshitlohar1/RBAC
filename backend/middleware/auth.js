const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
exports.verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  // Check if token is provided and properly formatted
  if (!token || !token.startsWith('Bearer ')) {
    return res.status(403).json({ message: 'No token provided or invalid format' });
  }

  const actualToken = token.split(' ')[1]; // Get the actual token

  jwt.verify(actualToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token has expired' });
      }
      return res.status(500).json({ message: 'Failed to authenticate token', error: err.message });
    }
    
    // Save user information in request for use in other routes
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  });
};

// Middleware to check user roles
exports.checkRole = (roles) => {
  return (req, res, next) => {
    // Validate that roles are defined and user has access
    if (!roles || roles.length === 0 || !roles.includes(req.userRole)) {
      return res.status(403).json({ message: 'Access denied' });
    }
    next();
  };
};
