import Link from 'next/link';
import { Button } from './ui/button';
import Bulb from './svg/bulb';
import { FeedbackSort } from './feedback-sort';

export const Navbar = ({ suggestionsCount }: { suggestionsCount: number }) => {
  return (
    <div className='flex justify-between bg-slate-700 text-slate-50 items-center p-4 rounded-lg mb-6'>
      <div className='flex gap-4 items-center'>
        <Bulb />
        <h3 className='pr-4 font-bold text-lg'>
          {suggestionsCount} Suggestions
        </h3>
        <FeedbackSort />
      </div>
      <Button className='bg-purple-600 hover:bg-purple-500'>
        <Link href='/feedback/add'>+ Add Feedback</Link>
      </Button>
    </div>
  );
};
