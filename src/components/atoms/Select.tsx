import React from 'react';

interface OptionData {
  option: string;
  value: string;
};

interface SelectProps {
  label: string;
  name: string;
  options: OptionData[];
};

const Select = (props: SelectProps) => {
  const { label, name, options } = props;

  return (
    <div className='flex flex-col gap-2 w-full'>
      <label className='Poppins600 text-sm text-[--blue]'>{label}</label>
      <select
        className='Poppins400 text-md border-4 border-gray-200 rounded-xl px-3 py-2 focus:outline-none' 
        name={name}>
        {
          options.map((option) =>
            <option value={option.value}>{option.option}</option>
          )
        }
      </select>
    </div>
  );
};

export default Select;