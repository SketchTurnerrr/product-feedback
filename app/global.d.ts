import { Database as DB } from '@/lib/database.types';

type Pfr = DB['public']['Tables']['product-feedback-requests']['Row'];
declare global {
  type Database = DB;

  type PfrType = Pfr & {
    upvotes: number;
    user_has_upvoted: boolean;
  };

  type Pfr = DB['public']['Tables']['product-feedback-requests']['Row'][''];

  // type Comment = DB['public']['Tables']['comments']['Row'];
  type FeedbackRow = DB['public']['Tables']['product-feedback-requests']['Row'];

  type FBComment = {
    replies: string[] | null;
    content: string;
    created_at: string;
    feedback_id: string;
    id: string;
    parent_comment_id: string | null;
    profile_id: {
      avatar_url: string;
      id: string;
      name: string;
    };
  };

  type FeedbackWithComments = {
    user_id: string | undefined;

    category: string | null;
    created_at: string;
    detail: string | null;
    id: string;
    status: string;
    title: string;
    user_id: string;

    comments: FBComment[];
  };
}
