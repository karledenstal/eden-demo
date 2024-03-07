import { Link, useRouter } from '@tanstack/react-router';
import { client } from '../client';
import { Trash2 } from 'lucide-react';

interface Props {
  title: string;
  author: string;
  summary: string;
  id: string;
}

export const ArticleBrief = ({ title, author, summary, id }: Props) => {
  const router = useRouter();

  const onDelete = async () => {
    await client.articles[id].delete();
    router.invalidate();
  };

  return (
    <div className="flex flex-col space-y-4 rounded-md p-4 border border-zinc-700">
      <div className="flex flex-col space-y-2">
        <Link key={id} to="/$articleId" params={{ articleId: id }}>
          <h2 className="font-semibold text-2xl">{title}</h2>
        </Link>
        <span className="font-mono text-xs text-zinc-500">by {author}</span>
      </div>
      <p className="text-zinc-300">{summary}</p>
      <div className="">
        <button
          onClick={onDelete}
          className="rounded-md bg-red-600 min-w-20 text-center p-2 pr-3 text-sm flex gap-2 items-center hover:brightness-95 transition-colors"
        >
          <Trash2 className="w-4" />
          Delete
        </button>
      </div>
    </div>
  );
};
