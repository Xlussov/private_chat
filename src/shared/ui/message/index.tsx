import { format } from 'date-fns';
import { FC } from 'react';

type Props = {
  text: string;
  timestamp: number;
  username: string;
  isOwn: boolean;
};

export const Message: FC<Props> = ({ text, timestamp, username, isOwn }) => {
  return (
    <div className='flex flex-col items-start'>
      <div className='max-w-[80%] group'>
        <div className='flex items-baseline gap-3 mb-1'>
          <span className={`text-xs font-bold ${isOwn ? 'text-green-500' : 'text-blue-500'}`}>
            {isOwn ? 'YOU' : username}
          </span>

          <span className='text-[10px] text-zinc-600'>{format(timestamp, 'HH:mm')}</span>
        </div>

        <p className='text-sm text-zinc-300 leading-relaxed break-all'>{text}</p>
      </div>
    </div>
  );
};
