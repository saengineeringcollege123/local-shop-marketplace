import express, { Request, Response } from 'express';
import Shop, { IShop } from '../models/Shop.js';
import Offer from '../models/Offer.js';

const router = express.Router();

// GET /api/shops - Get all shops
router.get('/', async (req: Request, res: Response) => {
  try {
    const shops = await Shop.find().sort({ createdAt: -1 });
    res.json(shops);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching shops', error });
  }
});

// GET /api/shops/:id - Get single shop with offers
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const shop = await Shop.findById(req.params.id);
    if (!shop) {
      return res.status(404).json({ message: 'Shop not found' });
    }

    const offers = await Offer.find({ shopId: req.params.id }).sort({ createdAt: -1 });
    
    res.json({
      ...shop.toObject(),
      offers
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching shop', error });
  }
});

// POST /api/shops - Add new shop
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, address, contact, location } = req.body;

    if (!name || !address || !contact?.phone || !contact?.email) {
      return res.status(400).json({ 
        message: 'Missing required fields: name, address, contact (phone and email)' 
      });
    }

    const newShop = new Shop({
      name,
      address,
      contact,
      location
    });

    const savedShop = await newShop.save();
    res.status(201).json(savedShop);
  } catch (error) {
    res.status(500).json({ message: 'Error creating shop', error });
  }
});

// PUT /api/shops/:id - Update shop
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const updatedShop = await Shop.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedShop) {
      return res.status(404).json({ message: 'Shop not found' });
    }

    res.json(updatedShop);
  } catch (error) {
    res.status(500).json({ message: 'Error updating shop', error });
  }
});

// DELETE /api/shops/:id - Delete shop
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const deletedShop = await Shop.findByIdAndDelete(req.params.id);
    if (!deletedShop) {
      return res.status(404).json({ message: 'Shop not found' });
    }

    // Also delete associated offers
    await Offer.deleteMany({ shopId: req.params.id });

    res.json({ message: 'Shop and associated offers deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting shop', error });
  }
});

export default router;