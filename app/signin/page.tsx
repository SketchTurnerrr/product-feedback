import { AuthBtnServer } from '@/components/auth-btn-server';
import { Button } from '@/components/ui/button';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';

export default async function SignIn() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    redirect('/');
  }

  return (
    <main className='bg-gradient-to-r from-indigo-500 grid min-h-screen items-center p-24 place-items-center'>
      <AuthBtnServer />
    </main>
  );
}
