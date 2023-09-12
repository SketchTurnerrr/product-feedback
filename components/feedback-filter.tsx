'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Button } from './ui/button';

export const Filter = ({ params }: { params: { category: string } }) => {
  const buttons = [
    {
      title: 'All',
      value: 'all',
    },
    {
      title: 'UI',
      value: 'ui',
    },
    {
      title: 'UX',
      value: 'ux',
    },
    {
      title: 'Enhancement',
      value: 'enhancement',
    },
    {
      title: 'Feature',
      value: 'feature',
    },
    {
      title: 'Bug',
      value: 'bug',
    },
  ];
  const router = useRouter();

  const handleClick = (e: { target: HTMLButtonElement }) => {
    const target = e.target;
    if (target) {
      router.push(`/?category=${target.value}`);
    }
  };

  return (
    <div className='rounded-lg  bg-white p-6 gap-2 flex flex-wrap'>
      {buttons.map((button) => {
        const isActive = params?.category === button.value;
        return (
          <Button
            className={`text-blue-600 hover:bg-blue-100 ${
              isActive
                ? 'bg-blue-500 text-white hover:bg-blue-500'
                : 'bg-slate-200'
            }`}
            size={'sm'}
            key={button.title}
            value={button.value}
            // @ts-ignore
            onClick={handleClick}
          >
            {button.title}
          </Button>
        );
      })}
    </div>
  );
};
