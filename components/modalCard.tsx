import React, { ReactNode } from 'react';

interface ModalCardProps {
    children: ReactNode;
}

export default function ModalCard({ children }: ModalCardProps) {
  return (
    <div className='w-full'>
      <h1 className=' text-purple-600'>LOGO</h1>
      {children}
    </div>
  );
}
