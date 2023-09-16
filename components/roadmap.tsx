'use client';
import Link from 'next/link';
import { Button } from './ui/button';
import { ChevronLeftIcon } from '@radix-ui/react-icons';
import CommentIcon from './svg/comment-icon';
import { Upvotes } from './upvotes';
import Image from 'next/image';
import noFeedbacks from '../assets/images/no-feedback.png';

export const Roadmap = ({ feedbacks }: { feedbacks: PfrType[] }) => {
  const planned = feedbacks.filter((fb) => fb.status === 'planned');
  const in_progress = feedbacks.filter((fb) => fb.status === 'in_progress');

  const live = feedbacks.filter((fb) => fb.status === 'live');

  return (
    <div className='container px-28 mt-12'>
      <Link
        href={'/'}
        className='flex mb-4 items-center font-bold text-slate-500'
      >
        <ChevronLeftIcon
          className='mr-4'
          width={20}
          height={20}
          stroke='#4661E6'
        />{' '}
        Go Back
      </Link>
      <div className='flex bg-slate-700 rounded-lg items-center justify-between w-full p-8'>
        <h1 className='font-bold text-xl text-white'>Roadmap</h1>
        <Link href='/feedback/add'>
          <Button className='bg-purple-600 hover:bg-purple-500'>
            + Add Feedback
          </Button>
        </Link>
      </div>

      {feedbacks.length !== 0 ? (
        <div className='flex justify-between gap-6'>
          <div className='my-6 flex flex-col gap-4'>
            <div>
              <h3 className='font-bold text-xl'>Planned</h3>
              <p className='text-gray-500 mb-4'>
                Ideas prioritized for research
              </p>
            </div>
            {planned.map((feedback) => (
              <div
                key={feedback.id}
                className='relative p-8 max-w-xs space-y-4 bg-white rounded-lg'
              >
                <div className='absolute h-[6px]  w-full rounded-tl-3xl top-0 right-0 rounded-tr-3xl bg-orange-400'></div>
                <div className='flex gap-4 pb-4 items-center'>
                  <div className='h-2 w-2 rounded-full bg-orange-400'></div>
                  <p>Planned</p>
                </div>

                <Link
                  className='font-bold text-lg hover:text-blue-600'
                  href={`/feedback/${feedback.id}`}
                >
                  {feedback.title}
                </Link>
                <p className='text-gray-500'>{feedback.detail}</p>

                <div className='rounded-lg p-2 text-sm capitalize bg-slate-100 text-blue-800 w-fit font-bold'>
                  {feedback.category === 'ui' || feedback.category === 'ux'
                    ? feedback.category.toUpperCase()
                    : feedback.category}
                </div>
                <div className='flex items-center justify-between'>
                  <Upvotes pfr={feedback} roadmap={true} />
                  <p className='flex items-center gap-2 font-bold'>
                    <CommentIcon /> {feedback.comments.length}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className='my-6 flex flex-col gap-4'>
            <div>
              <h3 className='font-bold text-xl'>In-progress</h3>
              <p className='text-gray-500 mb-4'>Currently being developed</p>
            </div>
            {in_progress.map((feedback) => (
              <div
                key={feedback.id}
                className='relative p-8 max-w-xs space-y-4 bg-white rounded-lg'
              >
                <div className='absolute h-[6px]  w-full rounded-tl-3xl top-0 right-0 rounded-tr-3xl bg-purple-600'></div>
                <div className='flex gap-4 pb-4 items-center'>
                  <div className='h-2 w-2 rounded-full bg-purple-600'></div>
                  <p>In-progress</p>
                </div>

                <Link
                  className='font-bold text-lg hover:text-blue-600'
                  href={`/feedback/${feedback.id}`}
                >
                  {feedback.title}
                </Link>

                <p className='text-gray-500'>{feedback.detail}</p>

                <div className='rounded-lg p-2 capitalize text-sm bg-slate-100 text-blue-800 w-fit font-bold'>
                  {feedback.category === 'ui' || feedback.category === 'ux'
                    ? feedback.category.toUpperCase()
                    : feedback.category}
                </div>
                <div className='flex items-center justify-between'>
                  <Upvotes pfr={feedback} roadmap={true} />
                  <p className='flex items-center gap-2 font-bold'>
                    <CommentIcon /> {feedback.comments.length}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className='my-6 flex flex-col gap-4'>
            <div>
              <h3 className='font-bold text-xl'>Live</h3>
              <p className='text-gray-500 mb-4'>Released features</p>
            </div>
            {live.map((feedback) => (
              <div
                key={feedback.id}
                className='relative p-8 max-w-xs space-y-4 bg-white rounded-lg'
              >
                <div className='absolute h-[6px]  w-full rounded-tl-3xl top-0 right-0 rounded-tr-3xl bg-sky-400'></div>
                <div className='flex gap-4 pb-4 items-center'>
                  <div className='h-2 w-2 rounded-full bg-sky-400'></div>
                  <p>Live</p>
                </div>

                <Link
                  className='font-bold text-lg hover:text-blue-600'
                  href={`/feedback/${feedback.id}`}
                >
                  {feedback.title}
                </Link>
                <p className='text-gray-500'>{feedback.detail}</p>

                <div className='rounded-lg capitalize p-2 text-sm bg-slate-100 text-blue-800 w-fit font-bold'>
                  {feedback.category === 'ui' || feedback.category === 'ux'
                    ? feedback.category.toUpperCase()
                    : feedback.category}
                </div>
                <div className='flex items-center justify-between'>
                  <Upvotes pfr={feedback} roadmap={true} />
                  <p className='flex items-center gap-2 font-bold'>
                    <CommentIcon /> {feedback.comments.length}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className='text-center p-10'>
          <h2 className='font-bold text-3xl'>No feedbacks yet</h2>
          <Image
            className='mx-auto mt-4'
            src={noFeedbacks}
            width={125}
            height={125}
            alt='a man with a magnifying glass'
          />
        </div>
      )}
    </div>
  );
};
