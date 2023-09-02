'use client';

import Image from 'next/image';
import { Button } from './ui/button';
import {
  Session,
  createClientComponentClient,
} from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

export const AuthBtnClient = ({ session }: { session: Session | null }) => {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();
  const handleSignIn = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
        redirectTo: 'http://localhost:3000/auth/callback',
      },
    });
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return session ? (
    <Button onClick={handleSignOut}>Sign out</Button>
  ) : (
    <Button onClick={handleSignIn}>
      <Image
        className='mr-2'
        src={'/google-logo.png'}
        alt='google logo'
        width={20}
        height={20}
      />
      Continue with Google
    </Button>
  );
};
