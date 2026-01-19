import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export const useRoomTimer = (ttl: number | undefined) => {
  const router = useRouter();
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);

  useEffect(() => {
    if (ttl !== undefined) setTimeRemaining(ttl);
  }, [ttl]);

  useEffect(() => {
    if (timeRemaining === null || timeRemaining < 0) return;

    if (timeRemaining === 0) {
      router.push('/?destroyed=true');
      return;
    }

    const interval = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev === null || prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeRemaining, router]);

  return { timeRemaining };
}
