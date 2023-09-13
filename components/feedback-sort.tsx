'use client';

import * as React from 'react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useStore } from '@/app/zustand/store';

export const FeedbackSort = () => {
  const setOrder = useStore((state) => state.setOrder);

  const handleChange = (value: string) => {
    setOrder(value);
  };

  return (
    <div className='flex items-center'>
      <span className='text-sm'>Sort by:</span>
      <Select onValueChange={handleChange}>
        <SelectTrigger className='w-[160px] border-none font-bold hover:text-gray-300 transition-colors duration-200'>
          <SelectValue placeholder='Most Upvotes' />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value='most_upvotes'>Most Upvotes</SelectItem>
            <SelectItem value='least_upvotes'>Least Upvotes</SelectItem>
            <SelectItem value='most_comments'>Most Comments</SelectItem>
            <SelectItem value='least_comments'>Least Comments</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
