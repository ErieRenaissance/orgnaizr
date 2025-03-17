'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { createClient } from '@/lib/auth';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export function ContainerForm() {
  const router = useRouter();
  const supabase = createClient();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const { error } = await supabase
        .from('containers')
        .insert([data]);
      
      if (error) throw error;
      
      toast.success('Container created');
      router.push('/dashboard');
    } catch (error) {
      toast.error('Failed to create container');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Input
          placeholder="Container Name"
          {...register('name')}
          className={errors.name ? 'border-destructive' : ''}
        />
        {errors.name && (
          <p className="text-sm text-destructive mt-1">{errors.name.message}</p>
        )}
      </div>
      <div>
        <Textarea
          placeholder="Description (optional)"
          {...register('description')}
        />
      </div>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Creating...' : 'Create Container'}
      </Button>
    </form>
  );
}