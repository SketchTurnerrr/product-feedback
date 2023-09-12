'use client';
import { useEffect } from 'react';
import { Upvotes } from './upvotes';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { ChatBubbleIcon } from '@radix-ui/react-icons';
import { Button } from './ui/button';
import Link from 'next/link';
import Image from 'next/image';
import noFeedback from '../assets/images/no-feedback.png';

export const Pfr = ({ pfr }: { pfr: PfrType[] }) => {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  useEffect(() => {
    const channel = supabase
      .channel('realtime pfr')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'product-feedback-requests',
        },
        (payload) => {
          router.refresh();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, router]);

  if (pfr.length === 0) {
    return (
      <div className='grid place-items-center h-full p-20 space-y-4 bg-white rounded-lg'>
        <Image
          src={noFeedback}
          width={125}
          height={125}
          alt='a man with a magnifying glass'
        />

        <h1 className='font-bold text-2xl'>There is no feedback yet.</h1>
        <p className='text-gray-500 max-w-[420px] text-center'>
          Got a suggestion? Found a bug that needs to be squashed? We love
          hearing about new ideas to improve our app.
        </p>
      </div>
    );
  }

  return pfr.map((item) => (
    <div
      key={item.id}
      className='flex bg-white items-center justify-center rounded-lg p-6'
    >
      <Upvotes pfr={item} />
      <Link className='w-full' href={`/feedback/${item.id}`}>
        <div className='mx-12 w-full'>
          <h1 className='font-bold text-lg hover:text-indigo-500'>
            {item.title}
          </h1>

          <p className='text-slate-500 mb-4'>{item.detail}</p>
          <Button className='text-[13px] capitalize h-6 p-2 bg-slate-200 hover:bg-slate-300 text-blue-800'>
            {item.category}
          </Button>
        </div>
      </Link>

      <div className='flex gap-2'>
        <ChatBubbleIcon width={22} height={22} />
        <p>{item.comments.length}</p>
      </div>
    </div>
  ));
};
