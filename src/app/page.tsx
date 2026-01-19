'use client';

import { Lobby } from '@/components/lobby';
import { Suspense } from 'react';

const Page = () => {
  return (
    <Suspense>
      <Lobby />
    </Suspense>
  );
};

export default Page;
