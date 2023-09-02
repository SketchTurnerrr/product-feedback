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
import { SelectCategory } from '@/components/select-category';

const AddFeedback = () => {
  return (
    <div className='container max-w-xl'>
      <Link href={'/'} className='flex items-center font-bold text-slate-500'>
        <ChevronLeftIcon
          className='mr-4'
          width={20}
          height={20}
          stroke='#4661E6'
        />{' '}
        Go Back
      </Link>

      <form className='bg-white'>
        <h1 className='font-bold text-2xl'>Create New Feedback</h1>

        <div>
          <label htmlFor='feedbackTitle'>Feedback Title</label>
          <p>Add a short, descriptive headline</p>
          <input type='text' />
        </div>
        <div>
          <label htmlFor='feedbackCategory'>Category</label>
          <p>Choose a category for your feedback</p>
          <SelectCategory />
        </div>
      </form>
    </div>
  );
};
export default AddFeedback;
