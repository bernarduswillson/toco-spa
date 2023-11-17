import React from 'react';
import { Link } from 'react-router-dom';

interface VoucherCardProps {
  id: number,
  number: number,
  code: string,
  amount: number,
};

function AdminCard(props: VoucherCardProps) {
  const { id, number, code, amount } = props;
  const route = `/voucher/${id}`;

  return (
    <tr>
      <td className='hidden lg:table-cell text-slate-500 text-xs Poppins400 px-2 py-2 text-center'>
        <span>{number}</span>
      </td>

      <td className='text-slate-500 text-xs Poppins400 px-2 py-2'>
        <div className='flex flex-col text-left'>
          <span>{code}</span>
          <span className='lg:hidden'>{amount} Gems</span>
        </div>
      </td>

      <td className='hidden lg:table-cell text-slate-500 text-xs Poppins400 px-2 py-2 text-center'>
        <span>{amount}</span>
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

export default AdminCard;