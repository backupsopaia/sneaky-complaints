
import { Router } from 'express';

const router = Router();

// Get all companies
router.get('/', (req, res) => {
  // Mock data for now
  res.json([
    {
      id: 1,
      name: 'Company 1',
      email: 'company1@example.com',
      active: true,
    },
    {
      id: 2,
      name: 'Company 2',
      email: 'company2@example.com',
      active: true,
    },
  ]);
});

// Get company by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  
  // Mock data for now
  res.json({
    id: parseInt(id),
    name: `Company ${id}`,
    email: `company${id}@example.com`,
    active: true,
  });
});

export default router;
