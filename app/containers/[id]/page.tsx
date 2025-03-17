'use client';

import { useEffect, useState } from 'react';
import { ContentList } from '@/components/containers/content-list';
import { ContentStats } from '@/components/containers/content-stats';
import { ContainerQRDialog } from '@/components/containers/container-qr-dialog';
import { ItemFormDialog } from '@/components/containers/item-form-dialog';
import { Button } from '@/components/ui/button';
import { Camera, Plus, QrCode } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { type Content, type Container } from '@/types/container';

export default function ContainerPage({ params }: { params: { id: string } }) {
  const [container, setContainer] = useState<Container | null>(null);
  const [contents, setContents] = useState<Content[]>([]);
  const [showQR, setShowQR] = useState(false);
  const [showItemForm, setShowItemForm] = useState(false);
  const [editingItem, setEditingItem] = useState<Content | undefined>();

  const loadContents = async () => {
    const { data } = await supabase
      .from('contents')
      .select('*')
      .eq('container_id', params.id)
      .order('created_at', { ascending: false });
    
    setContents(data || []);
  };

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
    loadContents();
  }, [params.id]);

  const handleDelete = async (contentId: string) => {
    const { error } = await supabase
      .from('contents')
      .delete()
      .eq('id', contentId);
    
    if (!error) {
      setContents(contents.filter(c => c.id !== contentId));
    }
  };

  const handleEdit = (item: Content) => {
    setEditingItem(item);
    setShowItemForm(true);
  };

  if (!container) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{container.name}</h1>
        <div className="flex space-x-4">
          <Button onClick={() => setShowItemForm(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Item
          </Button>
          <Button variant="outline" onClick={() => setShowQR(true)}>
            <QrCode className="mr-2 h-4 w-4" />
            View QR Code
          </Button>
          <Button asChild>
            <Link href={`/containers/${params.id}/scan`}>
              <Camera className="mr-2 h-4 w-4" />
              Scan Items
            </Link>
          </Button>
        </div>
      </div>

      <ContentStats contents={contents} />
      
      <ContentList
        contents={contents}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <ContainerQRDialog
        containerId={params.id}
        containerName={container.name}
        open={showQR}
        onOpenChange={setShowQR}
      />

      <ItemFormDialog
        containerId={params.id}
        item={editingItem}
        open={showItemForm}
        onOpenChange={(open) => {
          setShowItemForm(open);
          if (!open) setEditingItem(undefined);
        }}
        onSuccess={() => {
          loadContents();
          setShowItemForm(false);
          setEditingItem(undefined);
        }}
      />
    </div>
  );
}