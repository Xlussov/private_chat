import { Message as MessageType } from '@/lib/realtime';
import { Message } from '@/shared/ui/message';
import { FC } from 'react';


type Props = {
  messages: MessageType[];
  currentUsername: string;
};

export const MessageList: FC<Props> = ({ messages, currentUsername }) => {
  return (
    <div className='flex-1 overflow-y-auto p-4 space-y-4 [&::-webkit-scrollbar]:w-[5px] [&::-webkit-scrollbar]:h-[1px] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-400 [&::-webkit-scrollbar-thumb]:rounded-full'>
      {messages.length === 0 && (
        <div className='flex items-center justify-center h-full'>
          <p className='text-zinc-600 text-sm font-mono'>
            No messages yet, start the conversation.
          </p>
        </div>
      )}

      {messages.map(msg => (
        <Message
          key={msg.id}
          text={msg.text}
          timestamp={msg.timestamp}
          username={msg.sender}
          isOwn={msg.sender === currentUsername}
        />
      ))}
    </div>
  );
};
