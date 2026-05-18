import type { Request, Response, NextFunction } from "express";

const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Unhandled error:', err);
  if (res.headersSent) return;
  const status = err?.status || 500;
  const message = err?.message || 'Internal server error';
  res.status(status).json({ message });
}

export default errorHandler;
