import { Hono } from 'hono';

import { COMPANY } from '../../constants/Company';
import { CONTACT } from '../../constants/Contact';
import { OVERVIEW } from '../../constants/Overview';
import { QUESTION } from '../../constants/Question';
import { TERM } from '../../constants/Term';

const app = new Hono();

app.get('/term', async (c) => c.text(TERM, { headers: { 'Cache-Control': 'public, max-age=86400' } }));
app.get('/contact', async (c) => c.text(CONTACT, { headers: { 'Cache-Control': 'public, max-age=86400' } }));
app.get('/question', async (c) => c.text(QUESTION, { headers: { 'Cache-Control': 'public, max-age=86400' } }));
app.get('/company', async (c) => c.text(COMPANY, { headers: { 'Cache-Control': 'public, max-age=86400' } }));
app.get('/overview', async (c) => c.text(OVERVIEW, { headers: { 'Cache-Control': 'public, max-age=86400' } }));

export { app as footerApp };
