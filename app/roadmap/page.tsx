import { Roadmap } from '@/components/roadmap';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export default async function RoadmapServer() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data } = await supabase
    .from('product-feedback-requests')
    .select('*, profiles(*), upvotes(user_id), comments(content)')
    .not('status', 'eq', 'suggestion');

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const feedbacks =
    data?.map((feedback) => ({
      ...feedback,
      user_has_upvoted: !!feedback.upvotes.find(
        (upvote) => upvote.user_id === session?.user.id
      ),
      upvotes: feedback.upvotes.length,
    })) ?? [];

  return <Roadmap feedbacks={feedbacks || []} />;
}
