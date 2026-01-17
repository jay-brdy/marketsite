import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { authenticateUser, getUserById, registerUser, updateUserProfile } from '../services/userService.js';

export const authRouter = Router();

authRouter.post('/register', async (req, res, next) => {
  try {
    const { displayName, email, password } = req.body;
    if (!displayName || !email || !password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const user = await registerUser({ displayName, email, password });
    req.session.userId = user.id;
    res.json({ user });
  } catch (err) {
    if (err.code === '23505') {
      return res.status(409).json({ error: 'Email already exists' });
    }
    next(err);
  }
});

authRouter.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Missing credentials' });
    }
    const user = await authenticateUser({ email, password });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    req.session.userId = user.id;
    res.json({ user });
  } catch (err) {
    next(err);
  }
});

authRouter.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.status(204).end();
  });
});

authRouter.get('/me', async (req, res, next) => {
  try {
    if (!req.session?.userId) return res.status(200).json({ user: null });
    const user = await getUserById(req.session.userId);
    res.json({ user });
  } catch (err) {
    next(err);
  }
});

authRouter.patch('/me', requireAuth, async (req, res, next) => {
  try {
    const { displayName, birthday } = req.body;
    if (displayName === undefined && birthday === undefined) {
      return res.status(400).json({ error: 'Missing fields' });
    }
    const normalizedBirthday = birthday === '' ? null : birthday;
    const user = await updateUserProfile(req.session.userId, {
      displayName,
      birthday: normalizedBirthday
    });
    res.json({ user });
  } catch (err) {
    next(err);
  }
});
