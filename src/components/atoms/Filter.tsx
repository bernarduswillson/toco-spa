import React from 'react';

interface OptionData {
  option: string;
  value: string | number;
}

interface FilterProps {
  name: string;
  options: OptionData[];
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

function Filter(props: FilterProps) {
  const { name, options, onChange } = props;

  return (
    <select
      className='border-2 border-gray-400 text-gray-400 Poppins400 px-3 py-1 rounded-md w-full focus:outline-none' 
      name={name}
      onChange={onChange}  
    >
      {
        options.map((option, i) =>
          <option key={i} value={option.value}>{option.option}</option>
        )
      }
    </select>
  );
};

export default Filter;