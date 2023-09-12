'use client';

import { ChevronUpIcon } from '@radix-ui/react-icons';
import { Button } from './ui/button';
import {
  Session,
  createClientComponentClient,
} from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

export const Upvotes = ({ pfr }: { pfr: PfrType }) => {
  const router = useRouter();

  // I'm so sorry, this is so retarded

  const handleUpvote = async () => {
    const supabase = createClientComponentClient<Database>();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      if (pfr.user_has_upvoted) {
        // addOptimisticPfr({
        //   ...pfr,
        //   upvotes: pfr.upvotes - 1,
        //   user_has_upvoted: !pfr.user_has_upvoted,
        // });
        await supabase.from('upvotes').delete().match({
          user_id: user.id,
          feedback_id: pfr.id,
        });
      } else {
        // addOptimisticPfr({
        //   ...pfr,
        //   upvotes: pfr.upvotes + 1,
        //   user_has_upvoted: !pfr.user_has_upvoted,
        // });
        await supabase
          .from('upvotes')
          .insert({ user_id: user.id, feedback_id: pfr.id });
      }
      router.refresh();
    }
  };

  return (
    <Button
      onClick={handleUpvote}
      className='inline-grid h-16 justify-items-stretch bg-slate-200 hover:bg-slate-300 self-start w-12'
      size='icon'
    >
      <ChevronUpIcon className='h-5 w-5 text-blue-800' />
      <b className='text-slate-800'>{pfr.upvotes}</b>
    </Button>
  );
};
