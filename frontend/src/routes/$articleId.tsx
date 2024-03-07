import { createFileRoute } from '@tanstack/react-router';
import { client } from '../client';

const ArticleComponent = () => {
  const article = Route.useLoaderData();

  if (article == null) return null;

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col space-y-2">
        <h1 className="font-semibold text-4xl">{article.title}</h1>
        <span className="font-mono text-xs text-zinc-500">
          by {article.author} on {new Date(article.date).toDateString()}
        </span>
      </div>
      <div className="text-lg">{article.body}</div>
    </div>
  );
};

export const Route = createFileRoute('/$articleId')({
  loader: async ({ params: { articleId } }) => {
    const res = await client.articles[articleId].get();
    const data = res.data;

    return data;
  },
  notFoundComponent: () => {
    return <p>Article not found</p>;
  },
  component: ArticleComponent,
});
