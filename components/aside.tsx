import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';
import { cookies } from 'next/headers';

export const Aside = async ({ children }: { children: React.ReactNode }) => {
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data } = await supabase
    .from('product-feedback-requests')
    .select('status')
    .not('status', 'eq', 'suggestion');

  const statusCounts = ['planned', 'in_progress', 'live'].map((status) => ({
    status:
      status === 'planned'
        ? 'Planned'
        : status === 'live'
        ? 'Live'
        : 'In-Progress',
    count: data?.filter((item) => item.status === status).length,
  }));

  return (
    <section className='space-y-4'>
      <div className='pt-16 px-6 pb-4 bg-gradient-to-r from-purple-500 to-blue-600 rounded-lg'>
        <div>
          <h2 className='font-bold text-slate-100 text-xl'>Frontend Mentor</h2>
          <p className='text-gray-300'>Feedback board</p>
        </div>
      </div>

      {children}

      <div className='bg-white p-6 rounded-lg'>
        <header className='flex justify-between mb-4'>
          <h3 className='font-bold'>Roadmap</h3>

          <Link href={'/roadmap'}>
            <h3 className='font-bold underline text-blue-500'>View</h3>
          </Link>
        </header>
        <ul>
          {statusCounts.map((item) => {
            return (
              <li className='flex justify-between'>
                <div className='flex items-center justify-between w-full'>
                  <div className='flex items-center gap-3'>
                    <div
                      className={`h-2 w-2 ${
                        item.status === 'Planned'
                          ? 'bg-orange-400'
                          : item.status === 'Live'
                          ? 'bg-blue-600'
                          : 'bg-purple-600'
                      }  rounded-full`}
                    ></div>
                    <p className='text-gray-500'>{item.status}</p>
                  </div>
                  <p className='font-bold'>{item.count}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
