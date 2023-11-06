import React from 'react'

import Sidebar from '../../components/organisms/Sidebar';
import Breadcrumbs from '../../components/organisms/Breadcrumbs';
import PageTitle from '../../components/atoms/PageTitle';
import TextInput from '../../components/atoms/TextInput';
import Select from '../../components/atoms/Select';

const Create = () => {
  // URL Path ==============================
  const urlPath = [
    {
      id: 0,
      name: "Dashboard",
      url: "/",
      active: false
    },
    {
      id: 1,
      name: "Exercises",
      url: "/exercise",
      active: false
    },
    {
      id: 2,
      name: "New",
      url: "/exercise/new",
      active: true
    },
  ];
  // =======================================
  
  // Filter options ========================
  const difficultyOption = [
    {
      option: 'Beginner',
      value: 'beginner'
    },
    {
      option: 'Intermediate',
      value: 'intermediate'
    },
    {
      option: 'Advanced',
      value: 'advanced'
    },
  ];

  const languageOption = [
    {
      option: 'English',
      value: 'english'
    },
    {
      option: 'Indonesian',
      value: 'indonesian'
    },
    {
      option: 'Francais',
      value: 'francais'
    },
    {
      option: 'Deutsch',
      value: 'deutsch'
    },
  ];
  // =======================================

  return (
    <div className='flex'>
      {/* Sidebar */}
      <Sidebar active='Exercises'/>

      {/* Main content */}
      <div className='min-h-screen w-full py-5 lg:py-20 xl:py-28 pr-5 pl-28 flex flex-col gap-9 items-center'>
        
        {/* Header */}
        <div className="flex flex-col w-full max-w-[920px]">
          <Breadcrumbs urlPath={urlPath} />
          <PageTitle text='New Exercise'/>
        </div>

        {/* Exercise Form */}
        <div className="flex flex-col gap-4 w-full max-w-[920px]">
          {/* Meta */}
          <TextInput
            name='exe_name'
            value=''
            placeholder='Exercise name'
            label='Exercise name'
          />
          <TextInput
            name='category'
            value=''
            placeholder='Category'
            label='Category'
          />
          <Select label='Difficulty' name='difficulty' options={difficultyOption} />
          <Select label='Language' name='language' options={languageOption} />

          {/* Questions */}
        </div>

      </div>
    </div>
  );
};

export default Create;