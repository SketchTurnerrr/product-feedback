// import * as React from 'react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function SelectCategory() {
  return (
    <Select>
      <SelectTrigger className='w-[180px]'>
        <SelectValue placeholder='Select a fruit' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {/* <SelectLabel>Fruits</SelectLabel> */}
          <SelectItem value='apple'>Feature</SelectItem>
          <SelectItem value='banana'>UI</SelectItem>
          <SelectItem value='blueberry'>UX</SelectItem>
          <SelectItem value='grapes'>Enhancement</SelectItem>
          <SelectItem value='pineapple'>Bug</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
