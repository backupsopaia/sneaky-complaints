
import { Router } from 'express';

const router = Router();

// Get all complaints
router.get('/', (req, res) => {
  // Mock data for now
  res.json([
    {
      id: 1,
      title: 'Complaint 1',
      description: 'Description 1',
      status: 'open',
      priority: 'high',
      createdAt: '2024-01-01T00:00:00Z',
    },
    {
      id: 2,
      title: 'Complaint 2',
      description: 'Description 2',
      status: 'closed',
      priority: 'medium',
      createdAt: '2024-01-02T00:00:00Z',
    },
  ]);
});

// Get complaint by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  
  // Mock data for now
  res.json({
    id: parseInt(id),
    title: `Complaint ${id}`,
    description: `Description for complaint ${id}`,
    status: 'open',
    priority: 'high',
    createdAt: '2024-01-01T00:00:00Z',
  });
});

export default router;
