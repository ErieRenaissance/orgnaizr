'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/use-auth';
import { toast } from 'sonner';
import { authSchema, type AuthFormData } from '@/lib/utils/auth-validation';

export function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const { signIn, signUp } = useAuth();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
  });

  const onSubmit = async (data: AuthFormData) => {
    try {
      if (isLogin) {
        await signIn(data.email, data.password);
      } else {
        await signUp(data.email, data.password, data.displayName);
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Authentication failed');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Input
          type="email"
          placeholder="Email"
          {...register('email')}
          className={errors.email ? 'border-destructive' : ''}
        />
        {errors.email && (
          <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
        )}
      </div>
      
      {!isLogin && (
        <div>
          <Input
            type="text"
            placeholder="Display Name"
            {...register('displayName')}
            className={errors.displayName ? 'border-destructive' : ''}
          />
          {errors.displayName && (
            <p className="text-sm text-destructive mt-1">{errors.displayName.message}</p>
          )}
        </div>
      )}

      <div>
        <Input
          type="password"
          placeholder="Password"
          {...register('password')}
          className={errors.password ? 'border-destructive' : ''}
        />
        {errors.password && (
          <p className="text-sm text-destructive mt-1">{errors.password.message}</p>
        )}
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Loading...' : isLogin ? 'Sign In' : 'Sign Up'}
      </Button>
      
      <Button
        type="button"
        variant="ghost"
        onClick={() => setIsLogin(!isLogin)}
        className="w-full"
      >
        {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Sign In'}
      </Button>
    </form>
  );
}