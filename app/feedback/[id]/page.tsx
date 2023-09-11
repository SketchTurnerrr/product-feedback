'use client';
import { Button } from '@/components/ui/button';
import { Upvotes } from '@/components/upvotes';
import { ChatBubbleIcon, ChevronLeftIcon } from '@radix-ui/react-icons';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import {
  JSXElementConstructor,
  Key,
  PromiseLikeOfReactNode,
  ReactElement,
  ReactNode,
  ReactPortal,
  useEffect,
  useState,
} from 'react';

export default function Feedback({ params }: { params: { id: string } }) {
  const supabase = createClientComponentClient<Database>();

  const [feedback, setFeedback] = useState<any>();

  useEffect(() => {
    const getFeedback = async () => {
      const { data } = await supabase
        .from('product-feedback-requests')
        .select(`*, comments (*, profile_id (*))`)
        .eq('id', params.id)
        .single();
      setFeedback(data);
    };
    getFeedback();
  }, []);

  console.log(feedback);

  return (
    <div className='container max-w-3xl mt-20'>
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

      {feedback && (
        <div>
          <div className='flex bg-white items-center justify-center rounded-lg p-6'>
            <Upvotes pfr={feedback} />
            <Link className='w-full' href={`/feedback/${feedback.id}`}>
              <div className='mx-12 w-full'>
                <h1 className='font-bold text-lg hover:text-indigo-500'>
                  {feedback.title}
                </h1>

                <p className='text-slate-500 mb-4'>{feedback.detail}</p>
                <Button className='text-[13px] h-6 p-2 bg-slate-200 hover:bg-slate-300 text-blue-800'>
                  {feedback.category}
                </Button>
              </div>
            </Link>

            <div className='flex gap-4'>
              <ChatBubbleIcon width={22} height={22} />
              {feedback.comments.length}
            </div>
          </div>

          <div className='mt-8 bg-white p-6 rounded-lg [&>*:not(:last-child)]:border-b-[1px] [&:not(:last-child)]:border-blue-500'>
            <h2
              className='text-xl mb-8 font-bold'
              style={{ border: 'none' }}
            >{`${feedback?.comments.length} ${
              feedback?.comments.length === 1 ? 'Comment' : 'Comments'
            }`}</h2>

            {feedback &&
              feedback?.comments.map(
                (comment: {
                  id: Key | null | undefined;
                  profile_id: { avatar_url: string; name: string };
                  content: string;
                }) => {
                  return (
                    <div
                      key={comment?.id}
                      className='flex gap-4 w-full mb-4 p-4 '
                    >
                      <Image
                        src={comment.profile_id.avatar_url}
                        width={40}
                        height={40}
                        alt='avatar'
                        className='rounded-full self-start'
                      />
                      <div>
                        <h4 className='font-bold mb-4'>
                          {comment.profile_id.name}
                        </h4>
                        <p className='text-sm text-slate-500'>
                          {comment.content}
                        </p>
                      </div>
                    </div>
                  );
                }
              )}
          </div>
        </div>
      )}
    </div>
  );
}
