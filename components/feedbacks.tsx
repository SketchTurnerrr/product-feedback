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
import { useStore } from '@/app/zustand/store';

export const Feedbacks = ({ feedbacks }: { feedbacks: PfrType[] }) => {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();
  const order = useStore((state) => state.order);

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

  if (feedbacks.length === 0) {
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

  const sortedFeedbacks = feedbacks.sort((a, b) => {
    const aComments = a.comments?.length ?? 0;
    const bComments = b.comments?.length ?? 0;

    switch (order) {
      case 'most_upvotes':
        return b.upvotes - a.upvotes;
      case 'least_upvotes':
        return a.upvotes - b.upvotes;
      case 'most_comments':
        return bComments - aComments;
      case 'least_comments':
        return aComments - bComments;
      default:
        return 0;
    }
  });

  return sortedFeedbacks?.map((feedback) => (
    <div
      key={feedback.id}
      className='flex bg-white feedbacks-center justify-center rounded-lg p-6'
    >
      <Upvotes pfr={feedback} roadmap={null} />
      <Link className='w-full' href={`/feedback/${feedback.id}`}>
        <div className='mx-12 w-full'>
          <h1 className='font-bold text-lg hover:text-indigo-500'>
            {feedback.title}
          </h1>

          <p className='text-slate-500 mb-4'>{feedback.detail}</p>
          <Button className='text-[13px] capitalize h-6 p-2 bg-slate-200 hover:bg-slate-300 text-blue-800'>
            {feedback.category === 'ui' || feedback.category === 'ux'
              ? feedback.category.toUpperCase()
              : feedback.category}
          </Button>
        </div>
      </Link>

      <div className='flex gap-2'>
        <ChatBubbleIcon width={22} height={22} />
        <p>{feedback.comments.length}</p>
      </div>
    </div>
  ));
};
