import React, { FC } from 'react';

type Props = {
  title: string;
  message: string;
};

export const AlertMessage: FC<Props> = ({ title, message }) => {
  return (
    <div className='bg-red-950/50 border border-red-900 p-4 text-center'>
      <p className='text-red-500 text-sm font-bold uppercase'>{title}</p>
      <p className='text-zinc-500 text-xs mt-1'>{message}</p>
    </div>
  );
};
