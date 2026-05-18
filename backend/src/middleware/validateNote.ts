import type { Request, Response, NextFunction } from "express";

const validateNote = (req: Request, res: Response, next: NextFunction) => {
  const { title, content, color } = req.body || {};
  if (typeof title !== 'string' || !title.trim()) {
    return res.status(400).json({ message: 'Title is required' });
  }
  if (typeof content !== 'string' || !content.trim()) {
    return res.status(400).json({ message: 'Content is required' });
  }
  if (typeof color !== 'number' || Number.isNaN(color) || color < 0) {
    return res.status(400).json({ message: 'Color must be a non-negative number' });
  }
  next();
}

export default validateNote;
