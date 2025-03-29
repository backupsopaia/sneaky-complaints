
import { Router } from 'express';

const router = Router();

// Get all users
router.get('/', (req, res) => {
  // Mock data for now
  res.json([
    {
      id: 1,
      name: 'User 1',
      email: 'user1@example.com',
      role: 'admin',
    },
    {
      id: 2,
      name: 'User 2',
      email: 'user2@example.com',
      role: 'user',
    },
  ]);
});

// Get user by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  
  // Mock data for now
  res.json({
    id: parseInt(id),
    name: `User ${id}`,
    email: `user${id}@example.com`,
    role: 'user',
  });
});

export default router;
