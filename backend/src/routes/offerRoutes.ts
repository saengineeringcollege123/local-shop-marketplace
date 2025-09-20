import express, { Request, Response } from 'express';
import Offer, { IOffer } from '../models/Offer.js';
import Shop from '../models/Shop.js';

const router = express.Router();

// GET /api/offers/:shopId - Get all offers for a shop
router.get('/:shopId', async (req: Request, res: Response) => {
  try {
    const offers = await Offer.find({ shopId: req.params.shopId }).sort({ createdAt: -1 });
    res.json(offers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching offers', error });
  }
});

// POST /api/offers - Add new offer
router.post('/', async (req: Request, res: Response) => {
  try {
    const { shopId, title, description, startDate, endDate } = req.body;

    if (!shopId || !title || !description || !startDate || !endDate) {
      return res.status(400).json({ 
        message: 'Missing required fields: shopId, title, description, startDate, endDate' 
      });
    }

    // Verify shop exists
    const shop = await Shop.findById(shopId);
    if (!shop) {
      return res.status(404).json({ message: 'Shop not found' });
    }

    // Validate dates
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (end <= start) {
      return res.status(400).json({ message: 'End date must be after start date' });
    }

    const newOffer = new Offer({
      shopId,
      title,
      description,
      startDate: start,
      endDate: end
    });

    const savedOffer = await newOffer.save();
    res.status(201).json(savedOffer);
  } catch (error) {
    res.status(500).json({ message: 'Error creating offer', error });
  }
});

// PUT /api/offers/:id - Update offer
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const updatedOffer = await Offer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedOffer) {
      return res.status(404).json({ message: 'Offer not found' });
    }

    res.json(updatedOffer);
  } catch (error) {
    res.status(500).json({ message: 'Error updating offer', error });
  }
});

// DELETE /api/offers/:id - Delete offer
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const deletedOffer = await Offer.findByIdAndDelete(req.params.id);
    if (!deletedOffer) {
      return res.status(404).json({ message: 'Offer not found' });
    }

    res.json({ message: 'Offer deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting offer', error });
  }
});

// GET /api/offers/active/:shopId - Get active offers for a shop
router.get('/active/:shopId', async (req: Request, res: Response) => {
  try {
    const now = new Date();
    const activeOffers = await Offer.find({
      shopId: req.params.shopId,
      isActive: true,
      startDate: { $lte: now },
      endDate: { $gte: now }
    }).sort({ createdAt: -1 });

    res.json(activeOffers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching active offers', error });
  }
});

export default router;