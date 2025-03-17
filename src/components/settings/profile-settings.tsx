'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useUserProfile } from '@/hooks/use-user-profile';

const schema = z.object({
  display_name: z.string().min(2, 'Display name must be at least 2 characters'),
  email: z.string().email('Invalid email address').optional(),
});

type FormData = z.infer<typeof schema>;

export function ProfileSettings() {
  const { profile, updateProfile, loading } = useUserProfile();
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      display_name: profile?.display_name || '',
    },
  });

  const onSubmit = async (data: FormData) => {
    await updateProfile(data);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input
              placeholder="Display Name"
              {...register('display_name')}
              className={errors.display_name ? 'border-destructive' : ''}
            />
            {errors.display_name && (
              <p className="text-sm text-destructive mt-1">
                {errors.display_name.message}
              </p>
            )}
          </div>
          <Button type="submit">Save Changes</Button>
        </form>
      </CardContent>
    </Card>
  );
}