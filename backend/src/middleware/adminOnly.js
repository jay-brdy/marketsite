import { getUserById } from '../services/userService.js';

export async function adminOnly(req, res, next) {
  try {
    const user = await getUserById(req.session.userId);
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }
    next();
  } catch (err) {
    next(err);
  }
}
