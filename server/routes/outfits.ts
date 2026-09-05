import { Router, Request, Response } from 'express';
import { db } from '../db';
import { currentSessionUserId } from './auth';

const router = Router();

// GET all saved outfits for user
router.get('/', async (req: Request, res: Response) => {
  try {
    const outfits = await db.getOutfits(currentSessionUserId);
    res.json({ outfits });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch outfits' });
  }
});

// POST save outfit (PRD Section 31)
router.post('/', async (req: Request, res: Response) => {
  try {
    const { occasion, title, description, item_ids } = req.body;
    if (!occasion || !title || !Array.isArray(item_ids) || item_ids.length === 0) {
      return res.status(400).json({ error: 'Occasion, title, and item_ids are required' });
    }

    const outfit = await db.saveOutfit(currentSessionUserId, {
      occasion,
      title,
      description: description || '',
      item_ids,
    });

    res.status(201).json({ message: 'Outfit saved successfully', outfit });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save outfit' });
  }
});

// DELETE saved outfit
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const deleted = await db.deleteOutfit(currentSessionUserId, req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Outfit not found or already deleted' });
    }
    res.json({ message: 'Outfit removed successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete outfit' });
  }
});

export default router;
