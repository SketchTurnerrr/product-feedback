import { AuthBtnServer } from '@/components/auth-btn-server';
import { Button } from '@/components/ui/button';
import { ChevronRightIcon } from '@radix-ui/react-icons';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import Image from 'next/image';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Upvotes } from '@/components/upvotes';
import { Pfr } from '@/components/product-feedback-requests';
import { Navbar } from '@/components/navbar';
import { Aside } from '@/components/aside';

export default async function Home() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const { data } = await supabase
    .from('product-feedback-requests')
    .select('*, profiles(*), upvotes(user_id)');
  const pfr =
    data?.map((feedback) => ({
      ...feedback,
      user_has_upvoted: !!feedback.upvotes.find(
        (upvote) => upvote.user_id === session?.user.id
      ),
      upvotes: feedback.upvotes.length,
    })) ?? [];

  // console.log(pfr, 'pfr');

  if (!session) {
    redirect('signin');
  }
  return (
    <main className='bg-gradient-to-r container  grid  md:grid-cols-[255px_minmax(0,_1fr)]  min-h-screen  gap-6 p-24 '>
      <Aside />
      <div>
        <Navbar />

        <section className='space-y-3'>
          <Pfr pfr={pfr} />
        </section>

        {/* <AuthBtnServer /> */}
      </div>
    </main>
  );
}
