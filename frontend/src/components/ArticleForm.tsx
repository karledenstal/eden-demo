import { zodResolver } from '@hookform/resolvers/zod';
import { Save } from 'lucide-react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

const articleSchema = z.object({
  title: z.string().min(1),
  summary: z.string().min(1),
  body: z.string().min(1),
  author: z.string().min(1),
});

interface Props {
  onFormSubmit: SubmitHandler<FieldValues>;
  buttonLabel?: string;
  showCancel?: boolean;
  onCancel?: () => void;
  defaultValues?: z.infer<typeof articleSchema>;
}

interface CancelProps extends Props {
  showCancel: true;
  onCancel: () => void;
}

interface NoCancelProps extends Props {
  showCancel?: false;
  onCancel?: never;
}

type FormProps = CancelProps | NoCancelProps;

export const ArticleForm = ({
  onFormSubmit,
  buttonLabel = 'Create',
  showCancel = false,
  onCancel = undefined,
  defaultValues,
}: FormProps) => {
  const { register, handleSubmit, reset } = useForm({
    resolver: zodResolver(articleSchema),
    defaultValues,
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    await onFormSubmit(data);

    reset();
  };

  return (
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
        {buttonLabel}
      </button>
      {showCancel && (
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md bg-zinc-700 min-w-20 p-2 pr-3 text-sm justify-center flex gap-2 items-center hover:brightness-95 transition-colors"
        >
          Cancel
        </button>
      )}
    </form>
  );
};
