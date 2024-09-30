'use client';

import { useClerk } from '@clerk/nextjs';

export default function Home() {
  const { user } = useClerk();

  return <div>Schedule - {user?.id}</div>;
}
