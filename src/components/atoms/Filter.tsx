import React from 'react';

interface OptionData {
  option: string;
  value: string;
}

interface FilterProps {
  name: string;
  options: OptionData[];
}

function Filter(props: FilterProps) {
  const { name, options } = props;

  return (
    <select
      className='border-2 border-gray-400 text-gray-400 Poppins400 px-3 py-1 rounded-md w-full focus:outline-none' 
      name={name}>
      {
        options.map((option, i) =>
          <option key={i} value={option.value}>{option.option}</option>
        )
      }
    </select>
  );
};

export default Filter;