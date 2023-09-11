'use client';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
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
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const formSchema = z.object({
  feedbackTitle: z.string().nonempty({ message: "Title can't be empty" }),
  category: z.string().nonempty({ message: 'Please choose a category' }),
  feedbackDetail: z.string(),
});

export function CreateFeedback() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: '',
      feedbackTitle: '',
      feedbackDetail: '',
    },
  });

  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const fbTitle = String(values.feedbackTitle);
    const fbDetail = String(values.feedbackDetail);
    const fbCategory = String(values.category);

    const supabase = createClientComponentClient<Database>();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      await supabase.from('product-feedback-requests').insert({
        title: fbTitle,
        detail: fbDetail,
        category: fbCategory,
        user_id: user.id,
      });
    }
    // console.log(values);
    router.push('/');
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
                    <SelectValue placeholder='Select a verified email to display' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='Feature'>Feature</SelectItem>
                  <SelectItem value='UI'>UI</SelectItem>
                  <SelectItem value='UX'>UX</SelectItem>
                  <SelectItem value='Enhancement'>Enhancement</SelectItem>
                  <SelectItem value='Bug'>Bug</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
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
          Add Feedback
        </Button>
        <Button className='float-right mr-5' type='submit'>
          <Link href={'/'}>Cancel</Link>
        </Button>
      </form>
    </Form>
  );
}
