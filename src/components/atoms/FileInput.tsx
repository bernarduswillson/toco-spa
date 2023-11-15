import React from 'react';

interface FileInputProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const FileInput = (props: FileInputProps) => {
  const { onChange } = props;

  return (
    <div className='flex flex-col gap-2 w-full'>
      <input
        type='file'
        onChange={onChange}
        alt='Merchandise image'
      />
    </div>
  );
};

export default FileInput;