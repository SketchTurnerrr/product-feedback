import * as React from 'react';
const ChevronLeft = (
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={24}
    height={24}
    fill='none'
    stroke='currentColor'
    strokeLinecap='round'
    strokeLinejoin='round'
    strokeWidth={2}
    className='feather feather-chevron-left'
    {...props}
  >
    <path d='m15 18-6-6 6-6' />
  </svg>
);
export default ChevronLeft;
