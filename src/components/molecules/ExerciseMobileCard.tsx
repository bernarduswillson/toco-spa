import React from 'react';

interface ExerciseMobileCardProps {
  id: number,
  number: number,
  language: string,
  name: string,
  difficulty: string
};








function ExerciseMobileCard(props: ExerciseMobileCardProps) {
  const { id, number, language, name, difficulty } = props;
  const route = `/exercises/${id}`;

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
          <a 
            href={`${route}/edit`}
            className='w-[70px] px-2 py-1 flex items-center justify-center border-2 border-[--orange] text-xs Poppins400 rounded-md text-[--orange]'
          >
            Edit
          </a>
          <a 
            href={`${route}/result`}
            className='w-[70px] px-2 py-1 flex items-center justify-center border-2 border-[--orange] text-xs Poppins400 rounded-md text-[--orange]'
          >
            Result
          </a>
        </div>
      </td>
    </tr>
  );
};

export default ExerciseMobileCard;