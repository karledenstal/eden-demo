import { Elysia, t } from 'elysia';
import cors from '@elysiajs/cors';
import { db } from './db';

const app = new Elysia({ prefix: '/articles' })
  .use(cors({ methods: ['GET', 'POST', 'DELETE', 'PATCH', 'OPTIONS'] }))
  .get('/', async () => {
    const articles = await db.article.findMany();

    if (!articles) {
      return [];
    }

    return articles;
  })
  .get(
    '/:id',
    async ({ params }) =>
      await db.article.findUnique({ where: { id: params.id } })
  )
  .post(
    '/',
    async ({ body }) => {
      try {
        const articleDate = new Date(body.date);

        await db.article.create({
          data: {
            title: body.title,
            summary: body.summary,
            body: body.body,
            author: body.author,
            date: articleDate,
          },
        });
      } catch (e) {
        console.error(e);
      }
    },
    {
      body: t.Object({
        title: t.String(),
        summary: t.String(),
        body: t.String(),
        date: t.String(),
        author: t.String(),
      }),
    }
  )
  .delete(
    '/:id',
    async ({ params }) => await db.article.delete({ where: { id: params.id } })
  )
  .patch(
    '/:id',
    async ({ params, body }) => {
      console.log('body', body)
      await db.article.update({
        where: { id: params.id },
        data: {
          ...body,
        },
      });
    },
    {
      body: t.Object({
        title: t.Optional(t.String()),
        summary: t.Optional(t.String()),
        body: t.Optional(t.String()),
        author: t.Optional(t.String()),
      }),
    }
  )
  .listen(1111);

export type App = typeof app;

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
