'use client';

import { ContainerForm } from '@/components/containers/container-form';

export default function NewContainerPage() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Create New Container</h1>
      <div className="max-w-md">
        <ContainerForm />
      </div>
    </div>
  );
}