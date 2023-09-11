import { Database as DB } from '@/lib/database.types';

type Pfr = DB['public']['Tables']['product-feedback-requests']['Row'];
declare global {
  type Database = DB;

  type PfrType = Pfr & {
    upvotes: number;
    user_has_upvoted: boolean;
  };
}
