import fs from 'node:fs/promises';

import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { ServerStyleSheet } from 'styled-components';

import ClientApp from '@wsh-2024/app/src/index';

import { INDEX_HTML_PATH } from '../../constants/paths';
import { bookRepository } from '../../repositories';

const app = new Hono();

const getImageUrl = (id: string) => `/images/${id}?format=webp&width=192&height=256`;

const ssrInjecter = '<script id="inject-data" type="application/json"></script>';

async function createHTML({ body, path, styleTags }: { body: string; path: string; styleTags: string }) {
  const htmlContent = await fs.readFile(INDEX_HTML_PATH, 'utf-8');

  let content = htmlContent
    .replaceAll('<div id="root"></div>', `<div id="root">${body}</div>`)
    .replaceAll('<style id="tag"></style>', styleTags);

  if (path.startsWith('/books/')) {
    const splitted = path.split('/');
    const bookId = splitted[2];
    const res = await bookRepository.readWithEpisode({ params: { bookId: bookId || '' } });

    if (!res.isErr()) {
      const { image } = res.value;
      content = content.replaceAll(
        '<head>',
        `<head>\n<link rel="preload" href="${getImageUrl(image.id)}" as="image" />`,
      );
      content = content.replaceAll(
        ssrInjecter,
        `<script>window['__BLOG_INJECTED_DATA__'] = ${JSON.stringify(res.value)}</script>`,
      );
    }
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
