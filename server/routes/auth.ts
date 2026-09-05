import { Router, Request, Response } from 'express';
import { db } from '../db';

const router = Router();

// Mock active user session ID (default to user_alex for demo)
let currentSessionUserId = 'user_alex';

// GET current user session
router.get('/me', async (req: Request, res: Response) => {
  try {
    const profile = await db.getProfile(currentSessionUserId);
    if (!profile) {
      return res.status(404).json({ error: 'User profile not found' });
    }
    res.json({ user: profile });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch session user' });
  }
});

// POST Login
router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    let profile = await db.getProfile(currentSessionUserId);
    if (!profile) {
      profile = await db.upsertProfile({
        user_id: currentSessionUserId,
        email,
        full_name: email.split('@')[0] || 'User',
      });
    }
    res.json({ message: 'Login successful', user: profile });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

// POST Register
router.post('/register', async (req: Request, res: Response) => {
  const { full_name, email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const newUserId = `user_${Date.now()}`;
    currentSessionUserId = newUserId;
    const profile = await db.upsertProfile({
      user_id: newUserId,
      full_name: full_name || email.split('@')[0],
      email,
      wardrobe_type: 'MIXED',
    });
    res.json({ message: 'Registration successful', user: profile });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

// POST Google Sign-In
router.post('/google', async (req: Request, res: Response) => {
  try {
    const profile = await db.upsertProfile({
      user_id: currentSessionUserId,
      email: 'user.google@example.com',
      full_name: 'Google User',
    });
    res.json({ message: 'Google authentication successful', user: profile });
  } catch (error) {
    res.status(500).json({ error: 'Google sign-in failed' });
  }
});

// PUT Wardrobe Preference (PRD Section 13: MEN, WOMEN, MIXED)
router.put('/preference', async (req: Request, res: Response) => {
  const { wardrobe_type } = req.body;
  if (!wardrobe_type || !['MEN', 'WOMEN', 'MIXED'].includes(wardrobe_type)) {
    return res.status(400).json({ error: 'Invalid wardrobe_type. Must be MEN, WOMEN, or MIXED.' });
  }

  try {
    const updated = await db.upsertProfile({
      user_id: currentSessionUserId,
      wardrobe_type,
    });
    res.json({ message: 'Wardrobe preference updated', user: updated });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update preference' });
  }
});

// POST Logout
router.post('/logout', (req: Request, res: Response) => {
  res.json({ message: 'Logged out successfully' });
});

export { currentSessionUserId };
export default router;
