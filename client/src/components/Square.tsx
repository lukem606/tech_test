import React from 'react';

interface SquareProps {
    value: string | undefined
}

export const Square = ({ value }: SquareProps) => {
    return <div className='border-2 border-gray-900 w-10 h-10 cursor-pointer items-center justify-center text-2xl font-bold flex'>
        {value}
    </div>
}