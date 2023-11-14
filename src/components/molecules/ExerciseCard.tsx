import React from 'react';
import { Link } from 'react-router-dom';

interface ExerciseCardProps {
  id: number,
  number: number,
  name: string,
  difficulty: string
};

function ExerciseCard(props: ExerciseCardProps) {
  const { id, number, name, difficulty } = props;
  const route = `/exercise/${id}`;

  return (
    <tr>
      <td className='hidden lg:table-cell text-slate-500 text-xs Poppins400 px-2 py-2 text-center'>
        <span>{number}</span>
      </td>

      <td className='text-center py-2'>
        <img src="" alt="" />
      </td>

      <td className='text-slate-500 text-xs Poppins400 px-2 py-2'>
        <div className='flex flex-col text-left'>
          <span>{name}</span>
          <span className='lg:hidden'>{difficulty}</span>
        </div>
      </td>

      <td className='hidden lg:table-cell text-slate-500 text-xs Poppins400 px-2 py-2 text-center'>
        <span>{difficulty}</span>
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