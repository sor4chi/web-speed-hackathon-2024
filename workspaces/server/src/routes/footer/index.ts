import { brotliCompressSync } from 'node:zlib';

import { Hono } from 'hono';

import { COMPANY } from '../../constants/Company';
import { CONTACT } from '../../constants/Contact';
import { OVERVIEW } from '../../constants/Overview';
import { QUESTION } from '../../constants/Question';
import { TERM } from '../../constants/Term';

const app = new Hono();

// precompress
const COMPANY_BROTLI = brotliCompressSync(Buffer.from(COMPANY));

app.get('/company', (c) => {
  return c.body(COMPANY_BROTLI, 200, {
    'Cache-Control': 'public, max-age=31536000, immutable',
    'Content-Encoding': 'br',
  });
});

const CONTACT_BROTLI = brotliCompressSync(Buffer.from(CONTACT));

app.get('/contact', (c) => {
  return c.body(CONTACT_BROTLI, 200, {
    'Cache-Control': 'public, max-age=31536000, immutable',
    'Content-Encoding': 'br',
  });
});

const OVERVIEW_BROTLI = brotliCompressSync(Buffer.from(OVERVIEW));

app.get('/overview', (c) => {
  return c.body(OVERVIEW_BROTLI, 200, {
    'Cache-Control': 'public, max-age=31536000, immutable',
    'Content-Encoding': 'br',
  });
});

const QUESTION_BROTLI = brotliCompressSync(Buffer.from(QUESTION));

app.get('/question', (c) => {
  return c.body(QUESTION_BROTLI, 200, {
    'Cache-Control': 'public, max-age=31536000, immutable',
    'Content-Encoding': 'br',
  });
});

const TERM_BROTLI = brotliCompressSync(Buffer.from(TERM));

app.get('/term', (c) => {
  return c.body(TERM_BROTLI, 200, {
    'Cache-Control': 'public, max-age=31536000, immutable',
    'Content-Encoding': 'br',
  });
});

export { app as footerApp };
