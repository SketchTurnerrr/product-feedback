import { FeedbackDetails } from '@/components/feedback-details';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export default async function Feedback({ params }: { params: { id: string } }) {
  const supabase = createServerComponentClient<Database>({
    cookies,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data, error } = await supabase
    .from('product-feedback-requests')
    .select(`*, comments (*, profile_id (*)), upvotes(*)`)
    .eq('id', params.id)
    .single();

  return (
    <FeedbackDetails
      feedback_id={params.id}
      serverFeedback={data as unknown as FeedbackWithComments}
      session={session}
    />
  );
}
