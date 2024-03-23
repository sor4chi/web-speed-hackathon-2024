import fs from 'node:fs/promises';

import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { ServerStyleSheet } from 'styled-components';

import { ClientApp } from '@wsh-2024/app/src/index';

import { INDEX_HTML_PATH } from '../../constants/paths';

const app = new Hono();

const SRCSETS = [
  { maxw: 9999, minw: 768, path: '/assets/images/hero-1024.webp' },
  { maxw: 768, minw: 640, path: '/assets/images/hero-768.webp' },
  { maxw: 640, minw: 320, path: '/assets/images/hero-640.webp' },
  { maxw: 320, minw: 0, path: '/assets/images/hero-320.webp' },
];

async function createHTML({ body, path, styleTags }: { body: string; path: string; styleTags: string }) {
  const htmlContent = await fs.readFile(INDEX_HTML_PATH, 'utf-8');

  let content = htmlContent
    .replaceAll('<div id="root"></div>', `<div id="root">${body}</div>`)
    .replaceAll('<style id="tag"></style>', styleTags);
  // preload hero image
  if (path === '/') {
    content = content.replaceAll(
      '<head>',
      `<head>\n${SRCSETS.map(
        ({ maxw, minw, path }) =>
          `<link rel="preload" href="${path}" as="image" media="(min-width: ${minw}px) and (max-width: ${maxw}px)" />`,
      ).join('\n')}`,
    );
  }

  return content;
}

app.get('*', async (c) => {
  const sheet = new ServerStyleSheet();

  try {
    const body = ReactDOMServer.renderToString(
      sheet.collectStyles(
        <StaticRouter location={c.req.path}>
          <ClientApp />
        </StaticRouter>,
      ),
    );

    const styleTags = sheet.getStyleTags();
    const html = await createHTML({ body, path: c.req.path, styleTags });

    return c.html(html);
  } catch (cause) {
    throw new HTTPException(500, { cause, message: 'SSR error.' });
  } finally {
    sheet.seal();
  }
});

export { app as ssrApp };
