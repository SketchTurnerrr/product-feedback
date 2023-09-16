'use client';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import {
  createClientComponentClient,
  Session,
} from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { redirect } from 'next/navigation';
import Link from 'next/link';

const formSchema = z.object({
  feedbackTitle: z.string().nonempty({ message: "Title can't be empty" }),
  category: z.string().nonempty({ message: 'Please choose a category' }),
  feedbackDetail: z.string(),
  status: z.string(),
});

export function FeedbackForm({
  edit,
  data,
  session,
}: {
  edit: boolean;
  data: {
    id: string;
    category: string | null;
    status: string | null;
    feedbackTitle: string | null;
    feedbackDetail: string | null;
  } | null;
  session: Session | null;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: data?.category! || '',
      status: data?.status! || '',
      feedbackTitle: data?.feedbackTitle! || '',
      feedbackDetail: data?.feedbackDetail! || '',
    },
  });

  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const fbTitle = String(values.feedbackTitle);
    const fbDetail = String(values.feedbackDetail);
    const fbCategory = String(values.category);
    const fbStatus = String(values.status);

    const supabase = createClientComponentClient<Database>();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const query = edit
        ? supabase
            .from('product-feedback-requests')
            .update({
              title: fbTitle,
              detail: fbDetail,
              status: fbStatus,
              category: fbCategory,
              user_id: user.id,
            })
            //@ts-ignore
            .eq('id', data.id)
        : supabase.from('product-feedback-requests').insert({
            title: fbTitle,
            detail: fbDetail,
            category: fbCategory,
            status: 'suggestion',
            user_id: user.id,
          });

      await query;
    }

    router.push('/');
  }

  if (!session) {
    redirect('/');
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='inline-block space-y-6'
      >
        <FormField
          control={form.control}
          name='feedbackTitle'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='font-bold'>Feedback Title</FormLabel>
              <FormDescription>
                Add a short, descriptive headline
              </FormDescription>
              <FormControl>
                <Input type='text' className='bg-slate-50' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='category'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='font-bold'>Category</FormLabel>
              <FormDescription>
                Choose a category for your feedback
              </FormDescription>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue defaultValue={'feature'} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='feature'>Feature</SelectItem>
                  <SelectItem value='ui'>UI</SelectItem>
                  <SelectItem value='ux'>UX</SelectItem>
                  <SelectItem value='enhancement'>Enhancement</SelectItem>
                  <SelectItem value='bug'>Bug</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {edit && (
          <FormField
            control={form.control}
            name='status'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='font-bold'>Update status</FormLabel>
                <FormDescription>Change feedback state</FormDescription>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue defaultValue={'suggestion'} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='suggestion'>Suggestion</SelectItem>
                    <SelectItem value='planned'>Planned</SelectItem>
                    <SelectItem value='in_progress'>In-Progress</SelectItem>
                    <SelectItem value='live'>Live</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name='feedbackDetail'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='font-bold'>Feedback Detail</FormLabel>
              <FormDescription>
                Include any specific comments on what should be improved, added,
                etc.
              </FormDescription>
              <FormControl>
                <Textarea className='bg-slate-50' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className='float-right bg-purple-600 hover:bg-purple-500'
          type='submit'
        >
          {edit ? 'Save Changes' : 'Add Feedback'}
        </Button>
        <Button className='float-right mr-5' type='submit'>
          <Link href={'/'}>Cancel</Link>
        </Button>
      </form>
    </Form>
  );
}
