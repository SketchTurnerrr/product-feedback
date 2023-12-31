import { AuthBtnServer } from '@/components/auth-btn-server';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { Feedbacks } from '@/components/feedbacks';
import { Navbar } from '@/components/navbar';
import { Aside } from '@/components/aside';
import { Filter } from '@/components/feedback-filter';
import { UserUI } from '@/components/user-ui';

export default async function Home({
  searchParams,
}: {
  searchParams: { category: string };
}) {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { category } = searchParams;

  const query =
    category === 'all' || category === undefined
      ? supabase
          .from('product-feedback-requests')
          .select('*, profiles(*), upvotes(user_id), comments(content)')
          .eq('status', 'suggestion')
      : supabase
          .from('product-feedback-requests')
          .select('*, profiles(*), upvotes(user_id), comments(content)')
          .eq('category', category);

  const { data, error } = await query;

  const feedbacks =
    data?.map((feedback) => ({
      ...feedback,
      user_has_upvoted: !!feedback.upvotes.find(
        (upvote) => upvote.user_id === session?.user.id
      ),
      upvotes: feedback.upvotes.length,
    })) ?? [];

  // console.log(' session:', session);

  return (
    <div>
      <main className='relative bg-gradient-to-r container grid md:grid-cols-[255px_minmax(0,_1fr)]  min-h-screen  gap-6 p-24 '>
        {session && <UserUI user={session} />}
        <Aside>
          <Filter params={searchParams} />
        </Aside>
        <div>
          <Navbar session={session} suggestionsCount={data?.length || 0} />

          <section className='space-y-3'>
            <Feedbacks feedbacks={feedbacks} />
          </section>
        </div>
      </main>
    </div>
  );
}
