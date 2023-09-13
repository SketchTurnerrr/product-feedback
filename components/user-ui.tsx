'use client';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

export const UserUI = () => {
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();
  const handleSignout = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };
  return (
    <div className='top-5 right-0 p-4 absolute'>
      <Popover>
        <PopoverTrigger>
          <Avatar>
            <AvatarImage src='https://github.com/shadcn.png' />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </PopoverTrigger>
        <PopoverContent
          onClick={handleSignout}
          className='w-full px-3 py-2 cursor-pointer'
        >
          Sign out
        </PopoverContent>
      </Popover>
    </div>
  );
};
