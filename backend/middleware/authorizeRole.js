const authorizeRole = (roles) => {
    return (req, res, next) => {
      const userRoles = req.user.roles; // Assuming user object contains an array of roles
      if (!roles.some(role => userRoles.includes(role))) {
        return res.status(403).json({ message: 'Access forbidden: insufficient permissions' });
      }
      next();
    };
  };
  
  module.exports = authorizeRole;
  