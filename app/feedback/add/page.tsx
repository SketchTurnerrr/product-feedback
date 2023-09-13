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

const AddFeedback = () => {
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

        <FeedbackForm edit={false} data={null} />
      </div>
    </div>
  );
};
export default AddFeedback;
