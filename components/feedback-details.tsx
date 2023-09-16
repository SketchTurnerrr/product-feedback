'use client';

import { Key, useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import {
  Session,
  createClientComponentClient,
} from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';
import { ChatBubbleIcon, ChevronLeftIcon } from '@radix-ui/react-icons';
import Image from 'next/image';

export const FeedbackDetails = ({
  feedback_id,
  serverFeedback,
  session,
}: {
  feedback_id: string;
  serverFeedback: FeedbackWithComments;
  session: Session | null;
}) => {
  const [feedback, setFeedback] = useState(serverFeedback);
  const supabase = createClientComponentClient<Database>();
  const [content, setContent] = useState<string>('');
  // const [toggleReply, setToggleReply] = useState(false);
  const [replyState, setReplyState] = useState<any>({});

  const handleReply = (commentId: string) => {
    setReplyState((prevState: { [x: string]: boolean }) => ({
      ...prevState,
      [commentId]: !prevState[commentId],
    }));
  };

  const maxLength = 255;

  const characterCount = maxLength - content?.length;

  const handleChange = (e: { target: { value: string } }) => {
    setContent(e.target.value);
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
          setFeedback((prevFb: any) => ({
            ...prevFb,
            ...(payload.new as Pfr),
          }))
      )
      .subscribe();

    return () => {
      supabase.removeChannel(comments);
    };
  }, [supabase, setFeedback, feedback]);

  const addComment = async (reply: string | null) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user && content) {
        const { data, error } = await supabase.from('comments').insert({
          feedback_id: feedback_id,
          profile_id: user.id,
          content: content,
          parent_comment_id: reply || null,
        });
      }
      setContent('');
    } catch (error) {
      console.log(error);
    }
  };

  const commentMap = feedback.comments.reduce((acc, comment) => {
    const { id, parent_comment_id, ...rest } = comment;
    if (!parent_comment_id) {
      // This comment has no parent, so it's a root-level comment
      //@ts-ignore
      acc[id] = { id, ...rest, replies: [] };
    } else {
      // This comment has a parent, so it's a reply
      //@ts-ignore
      if (!acc[parent_comment_id]) {
        // Create the parent comment if it doesn't exist yet
        //@ts-ignore
        acc[parent_comment_id] = { replies: [] };
      }
      // Add this reply to its parent's replies array
      //@ts-ignore
      acc[parent_comment_id].replies.push({
        id,
        ...rest,
        parent_comment_id: null,
        replies: null,
        content: '',
        created_at: '',
        feedback_id: '',
        profile_id: {
          avatar_url: '',
          id: '',
          name: '',
        },
      });
    }
    return acc;
  }, {});

  // Convert the intermediate mapping to an array of root-level comments
  const organizedComments = Object.values(commentMap as FBComment);

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

        {feedback?.user_id === session?.user.id && (
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
                  {feedback.category === 'ui' || feedback.category === 'ux'
                    ? feedback.category.toUpperCase()
                    : feedback.category}
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
            {organizedComments?.map(
              //@ts-ignore
              (comment: FBComment) => {
                return (
                  <div key={comment.id}>
                    <div className='flex gap-6 w-full mb-4 py-4 '>
                      <Image
                        src={comment.profile_id.avatar_url}
                        width={40}
                        height={40}
                        alt='avatar'
                        className='rounded-full self-start'
                      />
                      <div className='flex items-center justify-between w-full'>
                        <div>
                          <div className='mb-4'>
                            <h4 className='font-bold'>
                              {comment.profile_id.name}
                            </h4>
                            <span className='text-gray-400 text-sm'>
                              @{comment.profile_id.id.split('-')[0]}
                            </span>
                          </div>
                          <p className='text-sm text-slate-500'>
                            {comment.content}
                          </p>
                        </div>
                        <Button
                          onClick={() => handleReply(comment.id)}
                          className='text-purple-600'
                          variant={'ghost'}
                        >
                          Reply
                        </Button>
                      </div>
                    </div>
                    {replyState[comment.id] && (
                      <div className='flex mt-8 items-center gap-4'>
                        <Textarea
                          name='reply input area'
                          maxLength={255}
                          value={content}
                          onChange={handleChange}
                          placeholder='Leave a comment'
                          className='bg-slate-100 h-20 mb-6'
                        />
                        <Button
                          onClick={() => addComment(comment?.id)}
                          size={'sm'}
                          className='bg-purple-600 hover:bg-purple-500'
                        >
                          Comment
                        </Button>
                      </div>
                    )}
                    {comment.replies &&
                      comment.replies.map(
                        //@ts-ignore
                        (reply: FBComment) => {
                          return (
                            <div
                              key={reply.id}
                              className=' pl-16 gap-6 w-full mb-4 py-4 '
                            >
                              <div className='flex items-center justify-between w-full'>
                                <div className='flex items-center gap-6'>
                                  <Image
                                    src={reply.profile_id.avatar_url}
                                    width={40}
                                    height={40}
                                    alt='avatar'
                                    className='rounded-full self-start'
                                  />
                                  <div>
                                    <div className='mb-4'>
                                      <h4 className='font-bold'>
                                        {reply.profile_id.name}
                                      </h4>
                                      <span className='text-gray-400 text-sm'>
                                        @{reply.profile_id.id.split('-')[0]}
                                      </span>
                                    </div>
                                    <p className='text-sm text-slate-500'>
                                      {reply.content}
                                    </p>
                                  </div>
                                </div>
                                <Button
                                  className='text-purple-600'
                                  name=''
                                  variant={'ghost'}
                                  onClick={() => handleReply(reply.id)}
                                >
                                  Reply
                                </Button>
                              </div>

                              {replyState[reply.id] && (
                                <div className='flex mt-8 items-center gap-4'>
                                  <Textarea
                                    name='reply input area'
                                    maxLength={255}
                                    value={content}
                                    onChange={handleChange}
                                    placeholder='Leave a comment'
                                    className='bg-slate-100 h-20 mb-6'
                                  />
                                  <Button
                                    onClick={() => addComment(comment?.id)}
                                    size={'sm'}
                                    className='bg-purple-600 hover:bg-purple-500'
                                  >
                                    Comment
                                  </Button>
                                </div>
                              )}
                            </div>
                          );
                        }
                      )}
                  </div>
                );
              }
            )}
          </div>

          {session && (
            <div className='p-8 rounded-lg bg-white mb-20'>
              <h3 className='font-bold text-lg mb-6'>Add comment</h3>
              <Textarea
                name='comment input area'
                maxLength={255}
                value={content}
                onChange={handleChange}
                placeholder='Leave a comment'
                className='bg-slate-100 h-20 mb-6'
              />
              <div className='flex justify-between items-center'>
                <p className='text-gray-400'>
                  {' '}
                  {characterCount} Characters left
                </p>

                <Button
                  onClick={() => addComment(null)}
                  size={'lg'}
                  className='bg-purple-600 hover:bg-purple-500'
                >
                  Comment
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
