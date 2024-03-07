import { createFileRoute, useRouter } from '@tanstack/react-router';
import { client } from '../client';
import { ArticleBrief } from '../components/ArticleBrief';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { ArticleForm } from '../components/ArticleForm';

const ArticleListing = () => {
  const router = useRouter();
  const articles = Route.useLoaderData() ?? [];

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const date = new Date();

    await client.articles[''].post({
      title: data.title,
      summary: data.summary,
      body: data.body,
      author: data.author,
      date: date.toLocaleString(),
    });

    router.invalidate();
  };

  return (
    <>
      <h1 className="font-semibold text-4xl mb-10">Articles</h1>
      <ArticleForm onFormSubmit={onSubmit} />
      <div className="flex flex-col space-y-8">
        {articles.map(({ title, summary, author, id }) => (
          <ArticleBrief
            key={id}
            id={id}
            title={title}
            author={author}
            summary={summary}
          />
        ))}
      </div>
    </>
  );
};

export const Route = createFileRoute('/')({
  component: ArticleListing,
  loader: async () => {
    const res = await client.articles[''].get();
    return res.data;
  },
});
