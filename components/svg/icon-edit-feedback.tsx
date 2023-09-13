import * as React from 'react';
const EditFeedbackIcon = (
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) => (
  <svg xmlns='http://www.w3.org/2000/svg' width={40} height={40} {...props}>
    <defs>
      <radialGradient
        id='a'
        cx='103.9%'
        cy='-10.387%'
        r='166.816%'
        fx='103.9%'
        fy='-10.387%'
      >
        <stop offset='0%' stopColor='#E84D70' />
        <stop offset='53.089%' stopColor='#A337F6' />
        <stop offset='100%' stopColor='#28A7ED' />
      </radialGradient>
    </defs>
    <g fill='none' fillRule='evenodd'>
      <circle cx={20} cy={20} r={20} fill='url(#a)' />
      <path
        fill='#FFF'
        fillRule='nonzero'
        d='m19.512 15.367 4.975 4.53-3.8 5.54L11.226 29l4.485-4.1c.759.275 1.831.026 2.411-.594a1.958 1.958 0 0 0-.129-2.82c-.836-.745-2.199-.745-2.964.068-.57.607-.767 1.676-.44 2.381L11 28.713c.255-1.06.683-2.75 1.115-4.436l.137-.531c.658-2.563 1.287-4.964 1.287-4.964l5.973-3.415zM23.257 12 28 16.443l-2.584 2.606-4.89-4.583L23.257 12z'
      />
    </g>
  </svg>
);
export default EditFeedbackIcon;
