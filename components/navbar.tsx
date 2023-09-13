'use client';
import Link from 'next/link';
import { Button } from './ui/button';
import Bulb from './svg/bulb';
import { FeedbackSort } from './feedback-sort';

import { Session } from '@supabase/supabase-js';
import { useToast } from './ui/use-toast';
import { ToastAction } from './ui/toast';
import { AuthBtnServer } from './auth-btn-server';
import { AuthBtnClient } from './auth-btn-client';

export const Navbar = ({
  suggestionsCount,
  session,
}: {
  suggestionsCount: number;
  session: Session | null;
}) => {
  const { toast } = useToast();

  return (
    <div className='flex justify-between bg-slate-700 text-slate-50 items-center p-4 rounded-lg mb-6'>
      <div className='flex gap-4 items-center'>
        <Bulb />
        <h3 className='pr-4 font-bold text-lg'>
          {suggestionsCount} Suggestions
        </h3>
        <FeedbackSort />
      </div>

      {!session ? (
        <Button
          className='mr-8'
          onClick={() => {
            toast({
              duration: 20000,
              title: 'Sign In to create a Feedback',
              className: 'max-w-[785px]',
              action: <AuthBtnClient session={session} />,
            });
          }}
        >
          + Add Feedback
        </Button>
      ) : (
        <Button className='bg-purple-600 hover:bg-purple-500'>
          <Link href='/feedback/add'>+ Add Feedback</Link>
        </Button>
      )}
    </div>
  );
};
