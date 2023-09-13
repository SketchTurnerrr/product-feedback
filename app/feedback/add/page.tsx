import ChevronLeft from '@/components/svg/chevron-left';
import { ChevronLeftIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FeedbackForm } from '@/components/feedback-form';
import AddFeedbackIcon from '@/components/svg/icon-new-feedback';
import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
const AddFeedback = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });

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
        <h1 className='font-bold text-2xl py-6 '>Create New Feedback</h1>
        <AddFeedbackIcon className='absolute -top-7' />

        <FeedbackForm session={session} edit={false} data={null} />
      </div>
    </div>
  );
};
export default AddFeedback;
