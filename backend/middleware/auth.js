import jwt from 'jsonwebtoken';

export const authenticate = (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'No token provided' });

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
    return null;
  }
};
