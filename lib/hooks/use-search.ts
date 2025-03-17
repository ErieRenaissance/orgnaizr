'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/auth';
import { type Database } from '@/types/supabase';

type SearchResult = {
  id: string;
  item_name: string;
  container_id: string;
  container_name: string;
  quantity: number;
};

export function useSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

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
            containers (
              name
            )
          `)
          .ilike('item_name', `%${query}%`)
          .limit(10);

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
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(searchItems, 300);
    return () => clearTimeout(debounce);
  }, [query, supabase]);

  return {
    query,
    setQuery,
    results,
    loading,
  };
}