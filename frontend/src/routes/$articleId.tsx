import { createFileRoute, useRouter } from '@tanstack/react-router';
import { client } from '../client';
import { useState } from 'react';
import { ArticleForm } from '../components/ArticleForm';
import { FieldValues, SubmitHandler } from 'react-hook-form';

const ArticleComponent = () => {
  const router = useRouter();
  const [inEditMode, setInEditMode] = useState(false);
  const article = Route.useLoaderData();

  if (article == null) return null;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    await client.articles[article.id].patch(data);
    setInEditMode(false);

    router.invalidate();
  };

  return (
    <>
      {inEditMode ? (
        <ArticleForm
          onFormSubmit={onSubmit}
          buttonLabel="Save"
          showCancel
          onCancel={() => setInEditMode(false)}
          defaultValues={{
            title: article.title,
            summary: article.summary,
            body: article.body,
            author: article.author,
          }}
        />
      ) : (
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col space-y-2">
            <h1 className="font-semibold text-4xl">{article.title}</h1>
            <div className="flex gap-2 items-center font-mono text-xs text-zinc-500">
              <span>
                by {article.author} on {new Date(article.date).toDateString()}
              </span>
              <button
                onClick={() => setInEditMode(true)}
                className="text-amber-600"
              >
                Edit
              </button>
            </div>
          </div>
          <div className="text-lg">{article.body}</div>
        </div>
      )}
    </>
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
