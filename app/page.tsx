import { AuthBtnServer } from '@/components/auth-btn-server';
import { Button } from '@/components/ui/button';
import { ChevronRightIcon } from '@radix-ui/react-icons';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import Image from 'next/image';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function Home() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const { data: pfr } = await supabase
    .from('product-feedback-requests')
    .select('*, profiles(*)');

  if (!session) {
    redirect('signin');
  }
  return (
    <main className='bg-gradient-to-r from-indigo-500 grid min-h-screen items-center p-24 place-items-center'>
      <Button>
        <Link href='/feedback/add'> add feedback</Link>
      </Button>
      <header>Welcome</header>
      <pre>{JSON.stringify(pfr, null, 2)}</pre>
      <div>
        <AuthBtnServer />
      </div>
    </main>
  );
}
