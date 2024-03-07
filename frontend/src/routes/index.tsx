import { createFileRoute, useRouter } from '@tanstack/react-router';
import { client } from '../client';
import { ArticleBrief } from '../components/ArticleBrief';
import { z } from 'zod';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Save } from 'lucide-react';

const createPostSchema = z.object({
  title: z.string().min(1),
  summary: z.string().min(1),
  body: z.string().min(1),
  author: z.string().min(1),
});

const ArticleListing = () => {
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm({
    resolver: zodResolver(createPostSchema),
  });
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

    reset()
    router.invalidate();
  };

  return (
    <>
      <h1 className="font-semibold text-4xl mb-10">Articles</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-2 mb-12"
      >
        <input
          className="bg-zinc-800 p-2 rounded-sm"
          {...register('title')}
          placeholder="Title"
        />
        <input
          className="bg-zinc-800 p-2 rounded-sm"
          {...register('author')}
          placeholder="Author"
        />
        <textarea
          className="bg-zinc-800 p-2 rounded-sm"
          {...register('summary')}
          placeholder="Summary"
        />
        <textarea
          rows={5}
          className="bg-zinc-800 p-2 rounded-sm"
          {...register('body')}
          placeholder="Body"
        />
        <button
          type="submit"
          className="rounded-md bg-blue-600 min-w-20 p-2 pr-3 text-sm justify-center flex gap-2 items-center hover:brightness-95 transition-colors"
        >
          <Save className="w-4" />
          Create
        </button>
      </form>
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
