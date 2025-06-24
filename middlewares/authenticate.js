import jwt from 'jsonwebtoken';

/**
 * Middleware to verify access token
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Next middleware function
 */
/**
 * This middleware checks for a valid JWT access token in the Authorization header.
 * If the token is valid, it adds the user ID to the request object and calls next().
 * If the token is invalid or missing, it responds with an error.
 */
const verifyAccessToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer '))
    return res.status(401).json({ message: 'Unauthorized' });

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(403).json({ message: 'Invalid or expired token' });
  }
};

export default verifyAccessToken;