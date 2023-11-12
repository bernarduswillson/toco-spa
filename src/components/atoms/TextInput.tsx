import React from 'react';

interface TextInputProps {
  name: string;
  value: string;
  placeholder: string;
  label: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput = (props: TextInputProps) => {
  const { name, value, placeholder, label, onChange } = props;

  return (
    <div className='flex flex-col gap-2 w-full'>
      <label className='Poppins600 text-xs text-[--blue]'>{label}</label>
      <input
        type="text"
        name={name}
        value={value}
        placeholder={placeholder}
        className='Poppins400 text-sm font-normal border-2 border-gray-200 rounded-xl px-3 py-2 focus:outline-none'
        onChange={onChange}
      />
    </div>
  );
};

export default TextInput;