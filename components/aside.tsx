import { Filter } from './feedback-filter';

export const Aside = () => {
  return (
    <section className='space-y-4'>
      <div className='pt-16 px-6 pb-4 bg-gradient-to-r from-purple-500 to-blue-600 rounded-lg'>
        <div>
          <h2 className='font-bold text-slate-100 text-xl'>Frontend Mentor</h2>
          <p className='text-gray-300'>Feedback board</p>
        </div>
      </div>

      <Filter />

      <div className='bg-white p-6 rounded-lg'>
        <header className='flex justify-between mb-4'>
          <h3 className='font-bold'>Roadmap</h3>
          <a href='#'>View</a>
        </header>
        <ul>
          <li className='flex justify-between'>
            <div>
              <p>Planned</p>
            </div>
            <p>2</p>
          </li>
          <li className='flex justify-between'>
            <div>
              <p>In progress</p>
            </div>
            <p>2</p>
          </li>
          <li className='flex justify-between'>
            <div>
              <p>Live</p>
            </div>
            <p>2</p>
          </li>
        </ul>
      </div>
    </section>
  );
};
