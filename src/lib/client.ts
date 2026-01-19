import { treaty } from '@elysiajs/eden';
import type { App } from '../app/api/[[...slugs]]/route';

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export const client = treaty<App>(baseUrl).api;
