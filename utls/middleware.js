const checkAccess = (req, res, next) => {

    const isAdmin = req.user && req.user.role === 'admin';
    if (isAdmin) {
      next();
    } else {
      res.status(403).json({ error: 'Access denied' });
    }
  };

module.exports = checkAccess;