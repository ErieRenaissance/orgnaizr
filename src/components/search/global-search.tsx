'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface SearchResult {
  id: string;
  item_name: string;
  container_id: string;
  container_name: string;
  quantity: number;
}

export function GlobalSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const searchItems = async () => {
      if (!query.trim()) {
        setResults([]);
        return;
      }

      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('contents')
          .select(`
            id,
            item_name,
            quantity,
            container_id,
            containers (name)
          `)
          .ilike('item_name', `%${query}%`)
          .limit(5);

        if (error) throw error;

        setResults(
          data.map(item => ({
            id: item.id,
            item_name: item.item_name,
            container_id: item.container_id,
            container_name: item.containers?.name || 'Unknown',
            quantity: item.quantity,
          }))
        );
      } catch (error) {
        console.error('Search error:', error);
        toast.error('Failed to search items');
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(searchItems, 300);
    return () => clearTimeout(debounce);
  }, [query]);

  return (
    <div className="relative max-w-md w-full">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search all items..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-9 pr-12"
        />
        {loading && (
          <Loader2 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin" />
        )}
      </div>

      {query.trim() && (
        <div className="absolute top-full mt-2 w-full rounded-md border bg-background shadow-lg">
          {results.length > 0 ? (
            <div className="p-2 space-y-1">
              {results.map((result) => (
                <Button
                  key={result.id}
                  variant="ghost"
                  className="w-full justify-start text-left"
                  onClick={() => {
                    navigate(`/containers/${result.container_id}`);
                    setQuery('');
                  }}
                >
                  <div className="flex flex-col">
                    <span>{result.item_name}</span>
                    <span className="text-xs text-muted-foreground">
                      in {result.container_name}
                    </span>
                  </div>
                </Button>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-sm text-muted-foreground">
              No items found
            </div>
          )}
        </div>
      )}
    </div>
  );
}