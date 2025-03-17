'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { contentFormSchema, type ContentFormData } from '@/lib/schemas/content-schema';
import { useContents } from '@/hooks/use-contents';

interface ContentFormProps {
  containerId: string;
  onSuccess: () => void;
}

export function ContentForm({ containerId, onSuccess }: ContentFormProps) {
  const { addContent, loading } = useContents(containerId);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<ContentFormData>({
    resolver: zodResolver(contentFormSchema),
    defaultValues: {
      quantity: 1,
      fragile: false,
    },
  });

  const onSubmit = async (data: ContentFormData) => {
    if (await addContent(data)) {
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Form fields remain the same */}
    </form>
  );
}