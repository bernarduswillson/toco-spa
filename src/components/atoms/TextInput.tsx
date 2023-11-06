import React from 'react';

interface TextInputProps {
  name: string;
  value: string;
  placeholder: string;
  label: string;
}

const TextInput = (props: TextInputProps) => {
  const { name, value, placeholder, label } = props;

  return (
    <div className='flex flex-col gap-2 w-full'>
      <label className='Poppins600 text-sm text-[--blue]'>{label}</label>
      <input
        type="text"
        name={name}
        value={value}
        placeholder={placeholder}
        className='Poppins400 text-md border-4 border-gray-200 rounded-xl px-3 py-2 focus:outline-none'  
      />
    </div>
  );
};

export default TextInput;