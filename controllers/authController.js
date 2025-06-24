import User from '../models/user.js';
import jwt from 'jsonwebtoken';

const createToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '15m' });
};

const createRefreshToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// Register user
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'User already exists' });

    user = await User.create({ name, email, password });

    res.status(201).json({ message: 'Registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Login user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const accessToken = createToken(user._id);
    const refreshToken = createRefreshToken(user._id);
    user.refreshToken = refreshToken;
    await user.save();

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        sameSite: 'strict',
        secure: false, // change to true if using HTTPS
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({ accessToken });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const refreshToken = async (req, res) => {
  const token = req.cookies.refreshToken;

  if (!token) return res.status(401).json({ message: 'No refresh token found' });

  try {
    const rt = await User.findOne({refreshToken: token});
    if (!rt) return res.status(403).json({ message: 'Invalid refresh token' });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const accessToken = jwt.sign({ id: decoded.id }, process.env.JWT_SECRET, {
      expiresIn: '15m',
    });

    res.json({ accessToken });
  } catch (err) {
    return res.status(403).json({ message: 'Invalid refresh token' });
  }
};

const logout = async (req, res) => {
    const token = req.cookies.refreshToken;
    if (token) {
        await User.findOneAndUpdate({ refreshToken: token }, { refreshToken: '' });
    }
  res.clearCookie('refreshToken', {
    httpOnly: true,
    sameSite: 'strict',
    secure: false, // true if using HTTPS
  });

  res.json({ message: 'Logged out successfully' });
};



export default {
  register,
  login,
  createToken,
  createRefreshToken,
  refreshToken,
  logout,
};