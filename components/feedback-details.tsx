'use client';

import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import {
  Session,
  createClientComponentClient,
} from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';
import { ChatBubbleIcon, ChevronLeftIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import { Upvotes } from './upvotes';

type Feedback =
  Database['public']['Tables']['product-feedback-requests']['Row'];

export const FeedbackDetails = ({
  feedback_id,
  serverFeedback,
  session,
}: {
  feedback_id: string;
  serverFeedback: Feedback;
  session: Session | null;
}) => {
  const [feedback, setFeedback] = useState(serverFeedback);
  const [charsLeft, setCharsLeft] = useState(455);
  const supabase = createClientComponentClient<Database>();
  const [content, setContent] = useState<string>();

  console.log('session?.user.id :', session?.user.id);
  console.log('feedback_id :');

  const handleChange = (e: { target: { value: string } }) => {
    if (e.target.value === '') {
      setCharsLeft(455);
    }

    setContent(e.target.value);

    setCharsLeft((prev) => prev - e.target.value.length);
  };

  useEffect(() => {
    setFeedback(serverFeedback);
  }, [serverFeedback]);

  useEffect(() => {
    const comments = supabase
      .channel('comments-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'comments' },
        (payload) =>
          setFeedback((prevFb) => ({
            ...prevFb,
            ...(payload.new as Feedback),
          }))
      )
      .subscribe();

    return () => {
      supabase.removeChannel(comments);
    };
  }, [supabase, setFeedback, feedback]);

  const addComment = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user && content) {
        const { data, error } = await supabase.from('comments').insert({
          feedback_id: feedback_id,
          profile_id: user.id,
          content: content,
        });
      }
      setContent('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='container max-w-3xl mt-20'>
      <div className='flex mb-8 items-center justify-between'>
        <Link
          href={'/'}
          className='flex   items-center font-bold text-slate-500'
        >
          <ChevronLeftIcon
            className='mr-4'
            width={20}
            height={20}
            stroke='#4661E6'
          />{' '}
          Go Back
        </Link>

        {feedback.user_id === session?.user.id && (
          <Link href={`edit/${feedback_id}`}>
            <Button className='bg-blue-500 hover:bg-blue-400'>
              Edit Feedback
            </Button>
          </Link>
        )}
      </div>

      {feedback && (
        <div>
          <div className='flex bg-white items-center justify-center rounded-lg p-6'>
            {/* <Upvotes pfr={feedback as PfrType} session={session} /> */}
            <Link className='w-full' href={`/feedback/${feedback.id}`}>
              <div className='mx-12 w-full'>
                <h1 className='font-bold text-lg hover:text-indigo-500'>
                  {feedback.title}
                </h1>

                <p className='text-slate-500 mb-4'>{feedback.detail}</p>
                <Button className='text-[13px] capitalize h-6 p-2 bg-slate-200 hover:bg-slate-300 text-blue-800'>
                  {feedback.category}
                </Button>
              </div>
            </Link>

            <div className='flex gap-4'>
              <ChatBubbleIcon width={22} height={22} />
              {feedback.comments.length}
            </div>
          </div>

          <div className='my-8 bg-white p-6 rounded-lg [&>*:not(:last-child)]:border-b-[1px] [&:not(:last-child)]:border-blue-500'>
            <h2
              className='text-xl mb-8 font-bold'
              style={{ border: 'none' }}
            >{`${feedback?.comments.length} ${
              feedback?.comments.length === 1 ? 'Comment' : 'Comments'
            }`}</h2>

            {feedback &&
              feedback?.comments.map(
                (comment: {
                  id: string;
                  profile_id: { avatar_url: string; name: string };
                  content: string;
                }) => {
                  return (
                    <div
                      key={comment?.id}
                      className='flex gap-6 w-full mb-4 py-4 '
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

          <div className='p-8 rounded-lg bg-white mb-20'>
            <h3 className='font-bold text-lg mb-6'>Add comment</h3>
            <Textarea
              name='comment input area'
              maxLength={455}
              value={content}
              onChange={handleChange}
              placeholder='Leave a comment'
              className='bg-slate-100 h-20 mb-6'
            />
            <div className='flex justify-between items-center'>
              <p>
                Characters left {charsLeft !== 0 ? 455 - charsLeft : charsLeft}
              </p>
              <p>{charsLeft}</p>
              <Button
                onClick={addComment}
                size={'lg'}
                className='bg-purple-600 hover:bg-purple-500'
              >
                Comment
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
