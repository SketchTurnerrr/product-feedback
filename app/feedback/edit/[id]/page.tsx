import { FeedbackForm } from '@/components/feedback-form';
import EditFeedbackIcon from '@/components/svg/icon-edit-feedback';
import { ChevronLeftIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { cookies } from 'next/headers';
import {
  createServerComponentClient,
  Session,
} from '@supabase/auth-helpers-nextjs';

const EditFeedback = async ({ params }: { params: { id: string } }) => {
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data } = await supabase
    .from('product-feedback-requests')
    .select('*')
    .eq('id', params.id)
    .single();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <div className='h-screen pt-24 container max-w-xl'>
      <Link
        href={'/'}
        className='flex mb-16 items-center font-bold text-slate-500'
      >
        <ChevronLeftIcon
          className='mr-4'
          width={20}
          height={20}
          stroke='#4661E6'
        />{' '}
        Go Back
      </Link>

      <div className='bg-white relative max-w-xl p-12 rounded-lg'>
        <h1 className='font-bold text-2xl py-6 '>
          Editing &quot;{data?.title}&quot;
        </h1>
        <EditFeedbackIcon className='absolute -top-5' />
        <FeedbackForm
          edit={true}
          data={{
            id: data?.id!,
            category: data?.category!,
            feedbackDetail: data?.detail!,
            feedbackTitle: data?.title!,
            status: data?.status!,
          }}
          session={session}
        />
      </div>
    </div>
  );
};
export default EditFeedback;
