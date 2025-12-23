import { Router } from 'express';
import { supabaseAdmin } from '../supabase';
import { requireAuth, AuthRequest } from '../middleware/auth';

const router = Router();

// Create Task
router.post('/', requireAuth, async (req: AuthRequest, res) => {
  const { title, description, status } = req.body;

  if (!title || title.trim() === '') {
    return res.status(400).json({ message: 'Title is required' });
  }

  const { data, error } = await supabaseAdmin
    .from('tasks')
    .insert([
      {
        title,
        description,
        user_id: req.userId,
        status: status
      },
    ])
    .select()
     .single();

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.status(201).json(data);
});

// Get Tasks
router.get('/', requireAuth, async (req: AuthRequest, res) => {
  const { data, error } = await supabaseAdmin
    .from('tasks')
    .select('*')
    .eq('user_id', req.userId);

  if (error) return res.status(400).json({ error: error.message });

  res.json(data);
});

// Update Task
router.put('/:id', requireAuth, async (req: AuthRequest, res) => {
  const { status } = req.body;

  const { data, error } = await supabaseAdmin
    .from('tasks')
    .update({ status })
    .eq('id', req.params.id)
    .eq('user_id', req.userId);

  if (error) return res.status(400).json({ error: error.message });

  res.json(data);
});

router.delete('/:id', requireAuth, async (req: AuthRequest, res) => {
  const { error } = await supabaseAdmin
    .from('tasks')
    .delete()
    .eq('id', req.params.id)
    .eq('user_id', req.userId);

  if (error) return res.status(400).json({ error: error.message });

  res.json({ message: 'Task deleted' });
});

export default router;
