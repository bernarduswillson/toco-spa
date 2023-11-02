import React from 'react';

interface ConfirmationModalProps {
  title: string,
  message: string,
  onCancel: () => void,
  onConfirm: () => void
};

const ConfirmationModal = (props: ConfirmationModalProps) => {
  const { title, message, onCancel, onConfirm } = props;
  
  return (
    <div
      onClick={onCancel}
      className='fixed z-50 w-screen h-screen bg-black/70 flex justify-center items-center'
    >
      <div className='bg-white p-6 rounded-lg flex flex-col gap-6 lg:px-16'>
        <div className='flex flex-col items-center gap-2'>
          <h2 className='Poppins600 text-md text-[--orange]'>{title}</h2>
          <p className='Poppins500 text-sm'>{message}</p>
        </div>
        <div className='flex justify-center gap-3'>
          <button
            onClick={onCancel}
            className='border-[--red] border-2 px-4 py-2 rounded-lg text-[--red] Poppins600 hover:bg-[--red] hover:text-white cursor-pointer'
          >Cancel</button>
          <button
            onClick={onConfirm}
            className='bg-[--red] px-4 py-2 rounded-lg text-white Poppins600 cursor-pointer'
          >Logout</button>
        </div>
      </div>
    </div>
  );  
};

export default ConfirmationModal;