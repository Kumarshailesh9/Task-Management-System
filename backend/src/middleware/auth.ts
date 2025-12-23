import { Request, Response, NextFunction } from 'express';
import { supabaseAuth } from '../supabase';

export interface AuthRequest extends Request {
  userId?: string;
}

export const requireAuth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];

  const { data, error } = await supabaseAuth.auth.getUser(token);

  if (error || !data.user) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  req.userId = data.user.id;
  next();
};
