import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookie from 'js-cookie';

import Sidebar from '../../components/organisms/Sidebar';
import Breadcrumbs from '../../components/organisms/Breadcrumbs';
import PageTitle from '../../components/atoms/PageTitle';
import Searchbar from '../../components/atoms/Searchbar';
import Filter from '../../components/atoms/Filter';
import ExerciseMobileCard from '../../components/molecules/ExerciseMobileCard';

interface SearchData {
  search: string;
  difficulty: string;
  language: string;
}

const Exercises = () => {
  const navigate = useNavigate();
  const token = Cookie.get('token');

  // Token validation ======================
  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);
  // =======================================

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
      active: true
    },
  ];
  // =======================================

  // Search and filter data ================
  const [searchData, setSearchData] = useState<SearchData>({
    search: '',
    difficulty: '',
    language: ''
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchData({ ...searchData, [name]: value });
    console.log(searchData.search);
  };

  const handleSubmitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // fetch di sini bew...
  }
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

  // Exercise Data =========================
  const exerciseData = [
    {
      id: 0,
      language: '/images/english-flag.png',
      name: 'Latihan 1',
      difficulty: 'Beginner'
    },
    {
      id: 1,
      language: '/images/english-flag.png',
      name: 'Latihan 2',
      difficulty: 'Beginner'
    },
    {
      id: 2,
      language: '/images/indonesian-flag.png',
      name: 'Latihan 1',
      difficulty: 'Advanced'
    }
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
          <PageTitle text='Exercises' create/>
        </div>

        {/* Search and Filter */}
        <div className='w-full max-w-[920px]'>
          <form onSubmit={handleSubmitSearch}>
            <div className='flex flex-col gap-2 w-full lg:flex-row'>
              <Searchbar onChange={handleSearchChange} />
              
              <div className='w-full flex gap-2'>
                <Filter name='language' options={languageOption} />
                <Filter name='difficulty' options={difficultyOption} />
              </div>

              <button
                type='submit'
                className='bg-[--orange] text-white Poppins400 px-10 py-1 rounded-md w-full lg:w-fit'
              >
                Apply
              </button>
            </div>
          </form>
        </div>

        {/* Records */}
        <div className='w-full max-w-[920px] flex flex-col gap-2'>
          <table className='min-w-full divide-y divide-gray-400'>
            <tr className=''>
              <th className='hidden lg:table-cell bg-[--orange] text-center text-white text-xs Poppins600 py-2'>No</th>
              <th className='bg-[--orange] text-center text-white text-xs Poppins600 py-2'>Lang</th>
              <th className='lg:hidden bg-[--orange] text-center text-white text-xs Poppins600 py-2'>Details</th>
              <th className='hidden lg:table-cell bg-[--orange] text-center text-white text-xs Poppins600 py-2'>Name</th>
              <th className='hidden lg:table-cell bg-[--orange] text-center text-white text-xs Poppins600 py-2'>Difficulty</th>
              <th className='bg-[--orange] text-center text-white text-xs Poppins600 py-2'>Actions</th>
            </tr>
            {
              exerciseData.map((exercise, number) => 
                <ExerciseMobileCard
                  id={exercise.id}
                  number={number + 1}
                  language={exercise.language}
                  name={exercise.name}
                  difficulty={exercise.difficulty}
                />
              )
            }
          </table>

        </div>
      </div>
    </div>
  );
};

export default Exercises;
