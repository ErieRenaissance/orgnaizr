'use client';

import { useEffect, useState } from 'react';
import { QRCodeDisplay } from '@/components/containers/qr-code-display';
import { supabase } from '@/lib/supabase';
import { type Container } from '@/types/container';

export default function QRPage({ params }: { params: { id: string } }) {
  const [container, setContainer] = useState<Container | null>(null);

  useEffect(() => {
    const loadContainer = async () => {
      const { data } = await supabase
        .from('containers')
        .select('*')
        .eq('id', params.id)
        .single();
      
      setContainer(data);
    };

    loadContainer();
  }, [params.id]);

  if (!container) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">QR Code for {container.name}</h1>
      <div className="max-w-md mx-auto">
        <QRCodeDisplay
          containerId={container.id}
          containerName={container.name}
        />
      </div>
    </div>
  );
}