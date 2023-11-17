import React from 'react';
import { Link } from 'react-router-dom';

interface MerchCardProps {
  id: number,
  number: number,
  name: string,
  price: number,
  image: string
  desc: string
};

function ExerciseCard(props: MerchCardProps) {
  const { id, number, name, price, image, desc } = props;
  const route = `/merchandise/${id}`;

  return (
    <tr>
      <td className='hidden lg:table-cell text-slate-500 text-xs Poppins400 px-2 py-2 text-center'>
        <span>{number}</span>
      </td>

      <td className='text-center py-2 flex justify-center items-center'>
        <img className='w-[12px] h-[12px] rounded-full overflow-hidden' src={`http://localhost:5000/image/?filename=${image}&apiKey=ax5kBNUxP2Cr0l8dwR472lMOiPeyJLRY7mKbTw0Cc8Z3hVW2kYmtAFcTNctI9139hHWUbJ5q3U8mRlZopXhFd9sTleg4lPr0DQkeMg3ntQZZFaTrASrWbc5QZ4CDIlPO`} alt={`name-${image}`} />
      </td>

      <td className='text-slate-500 text-xs Poppins400 px-2 py-2'>
        <div className='flex flex-col text-left'>
          <span>{name}</span>
          <span className='lg:hidden'>{price} Gems</span>
        </div>
      </td>

      <td className='hidden lg:table-cell text-slate-500 text-xs Poppins400 px-2 py-2 text-center'>
        <span>{price} Gems</span>
      </td>

      <td className='hidden lg:table-cell text-slate-500 text-xs Poppins400 px-2 py-2 text-center'>
        <span>{desc}</span>
      </td>

      <td>
        <div className='flex flex-col items-center px-2 py-2 gap-2'>
          <Link to={`${route}`}>
            <span 
              className='w-[70px] px-2 py-1 flex items-center justify-center border-2 border-[--orange] text-xs Poppins400 rounded-md text-[--orange]'
            >
              Edit
            </span>
          </Link>
        </div>
      </td>
    </tr>
  );
};

export default ExerciseCard;