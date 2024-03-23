import { OpenAPIHono } from '@hono/zod-openapi';

import { advancedSearchBookApp } from './advancedSearchBook';
import { deleteBookApp } from './deleteBook';
import { getBookApp } from './getBook';
import { getBookListApp } from './getBookList';
import { getBookWithEpisodeApp } from './getBookWithEpisiode';
import { patchBookApp } from './patchBook';
import { postBookApp } from './postBook';
import { searchBookApp } from './searchBook';

const app = new OpenAPIHono();

app.route('/', getBookApp);
app.route('/', searchBookApp);
app.route('/', advancedSearchBookApp);
app.route('/', getBookListApp);
app.route('/', getBookWithEpisodeApp);
app.route('/', postBookApp);
app.route('/', patchBookApp);
app.route('/', deleteBookApp);

export { app as bookApp };
