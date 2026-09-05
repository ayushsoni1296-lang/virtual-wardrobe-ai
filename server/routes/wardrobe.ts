import { Router, Request, Response } from 'express';
import { db } from '../db';
import { currentSessionUserId } from './auth';

const router = Router();

// GET all items for user
router.get('/', async (req: Request, res: Response) => {
  try {
    const category = req.query.category as string | undefined;
    const search = req.query.search as string | undefined;

    const items = await db.getClothingItems(currentSessionUserId, category, search);
    res.json({ items });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch clothing items' });
  }
});

// GET single item
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const item = await db.getClothingItemById(currentSessionUserId, req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json({ item });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch item' });
  }
});

// POST add new clothing item (PRD Section 17, 21-23)
router.post('/', async (req: Request, res: Response) => {
  try {
    const {
      name,
      original_image_url,
      processed_image_url,
      category,
      subcategory,
      color,
      secondary_color,
      pattern,
      style,
      season,
      gender,
      ai_confidence,
    } = req.body;

    if (!name || !processed_image_url) {
      return res.status(400).json({ error: 'Name and image are required' });
    }

    const newItem = await db.addClothingItem(currentSessionUserId, {
      name,
      original_image_url: original_image_url || processed_image_url,
      processed_image_url,
      category: category || 'tops',
      subcategory: subcategory || 'shirt',
      color: color || 'Blue',
      secondary_color: secondary_color || null,
      pattern: pattern || 'solid',
      style: style || 'casual',
      season: season || 'all_season',
      gender: gender || 'unisex',
      ai_confidence: typeof ai_confidence === 'number' ? ai_confidence : 0.95,
    });

    res.status(201).json({ message: 'Item added successfully', item: newItem });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add clothing item' });
  }
});

// PUT update clothing item (PRD Section 25)
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const updated = await db.updateClothingItem(currentSessionUserId, req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json({ message: 'Item updated successfully', item: updated });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update clothing item' });
  }
});

// DELETE clothing item (PRD Section 26)
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const deleted = await db.deleteClothingItem(currentSessionUserId, req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Item not found or already deleted' });
    }
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete clothing item' });
  }
});

// POST reset demo items
router.post('/reset', (req: Request, res: Response) => {
  db.resetMockData();
  res.json({ message: 'Database reset to initial demo state' });
});

export default router;
