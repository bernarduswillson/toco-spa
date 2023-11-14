import React from 'react';

interface OptionData {
  option: string;
  value: string | number;
};

interface SelectProps {
  label: string;
  name: string;
  value: string | number;
  options: OptionData[];
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

const Select = (props: SelectProps) => {
  const { label, name, value, options, onChange } = props;

  return (
    <div className='flex flex-col gap-2 w-full'>
      <label className='Poppins600 text-xs text-[--blue]'>{label}</label>
      <select
        className='Poppins400 text-sm border-2 border-gray-200 rounded-xl px-3 py-1 focus:outline-none' 
        name={name}
        value={value}
        onChange={onChange}>
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