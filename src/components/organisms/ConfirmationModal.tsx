import React from 'react';

interface ConfirmationModalProps {
  title: string,
  message: string,
  ok: string,
  cancel: string,
  onCancel: () => void,
  onConfirm: () => void
  warning?: boolean
};

const ConfirmationModal = (props: ConfirmationModalProps) => {
  const { title, message, ok, cancel, onCancel, onConfirm, warning } = props;
  
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
          {
            cancel ? (
              <button
                onClick={onCancel}
                className={`${warning ? 'border-[--red] text-[--red] hover:bg-[--red] hover:text-white' : 'border-[--blue] text-[--blue]'} border-2 px-4 py-2 rounded-lg Poppins600 cursor-pointer`}
              >
                {cancel}
                </button>
                )
              : (null)
          }
          
          <button
            onClick={onConfirm}
            className={`${warning ? 'bg-[--red]' : 'blue-purple-button'} px-4 py-2 rounded-lg text-white Poppins600 cursor-pointer`}
          >{ok}</button>
        </div>
      </div>
    </div>
  );  
};

export default ConfirmationModal;