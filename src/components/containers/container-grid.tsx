import { useState, useEffect } from 'react';
import { ContainerCard } from './container-card';
import { Input } from '@/components/ui/input';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { type Container } from '@/types/container';

export function ContainerGrid() {
  const [containers, setContainers] = useState<Container[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadContainers();
  }, []);

  const loadContainers = async () => {
    try {
      const { data, error } = await supabase
        .from('containers')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setContainers(data || []);
    } catch (error) {
      console.error('Failed to load containers:', error);
      toast.error('Failed to load containers');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('containers')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      setContainers(containers.filter(c => c.id !== id));
      toast.success('Container deleted');
    } catch (error) {
      console.error('Failed to delete container:', error);
      toast.error('Failed to delete container');
    }
  };

  const filteredContainers = containers.filter(container =>
    container.name.toLowerCase().includes(search.toLowerCase()) ||
    container.description?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <div>Loading containers...</div>;
  }

  return (
    <div className="space-y-4">
      <Input
        type="search"
        placeholder="Search containers..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredContainers.length > 0 ? (
          filteredContainers.map((container) => (
            <ContainerCard
              key={container.id}
              container={container}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-8 text-muted-foreground">
            {search ? 'No containers found matching your search' : 'No containers yet'}
          </div>
        )}
      </div>
    </div>
  );
}