'use client';

import { useUsername } from '@/shared/hooks/use-username';
import { client } from '@/lib/client';
import { useRealtime } from '@/lib/realtime-client';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { RoomHeader } from '@/components/room/RoomHeader';
import { MessageList } from '@/components/room/MessageList';
import { Input } from '@/components/room/Input';

export const Room = () => {
  const params = useParams();
  const roomId = params.roomId as string;

  const router = useRouter();

  const { username } = useUsername();

  const { data: ttlData } = useQuery({
    queryKey: ['ttl', roomId],
    queryFn: async () => {
      const res = await client.room.ttl.get({ query: { roomId } });
      return res.data;
    },
  });

  const { data: messages, refetch } = useQuery({
    queryKey: ['messages', roomId],
    queryFn: async () => {
      const res = await client.messages.get({ query: { roomId } });
      return res.data;
    },
  });

  const { mutate: sendMessage, isPending } = useMutation({
    mutationFn: async ({ text }: { text: string }) => {
      await client.messages.post({ sender: username, text }, { query: { roomId } });
    },
  });

  useRealtime({
    channels: [roomId],
    events: ['chat.message', 'chat.destroy'],
    onData: ({ event }) => {
      if (event === 'chat.message') {
        refetch();
      }

      if (event === 'chat.destroy') {
        router.push('/?destroyed=true');
      }
    },
  });

  const { mutate: destroyRoom } = useMutation({
    mutationFn: async () => {
      await client.room.delete(null, { query: { roomId } });
    },
  });

  return (
    <main className='flex flex-col h-screen max-h-screen overflow-hidden'>
      <RoomHeader roomId={roomId} ttl={ttlData?.ttl} onDestroy={destroyRoom} />
      <MessageList messages={messages?.messages || []} currentUsername={username} />
      <Input onSend={text => sendMessage({ text })} isPending={isPending} />
    </main>
  );
};
