import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { AuthBtnClient } from './auth-btn-client';

export const AuthBtnServer = async () => {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return <AuthBtnClient session={session} />;
};
