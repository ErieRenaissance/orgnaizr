import { type Database } from './supabase';

export type Container = Database['public']['Tables']['containers']['Row'];
export type Content = Database['public']['Tables']['contents']['Row'];

export interface ContainerWithLocation extends Container {
  storage_locations?: {
    name: string;
    type: string;
  } | null;
}

export interface ContentWithContainer extends Content {
  containers?: {
    id: string;
    name: string;
  } | null;
}