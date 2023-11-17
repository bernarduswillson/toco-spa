import React, { useEffect, useState} from 'react';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import useToken from '../../hooks/useToken';
import { useNavigate } from 'react-router';
import 'react-toastify/dist/ReactToastify.css';

import Sidebar from '../../components/organisms/Sidebar';
import Breadcrumbs from '../../components/organisms/Breadcrumbs';
import PageTitle from '../../components/atoms/PageTitle';
import Searchbar from '../../components/atoms/Searchbar';
import Filter from '../../components/atoms/Filter';
import ExerciseMobileCard from '../../components/molecules/ExerciseCard';

interface SearchData {
  search: string;
  difficulty: string;
  language: number;
}

interface ExerciseData {
  exercise_id: number;
  exe_name: string;
  language_id: number;
  category: string;
  difficulty: string;
};

const Exercises = () => {
  const { auth } = useAuth();
  const token = auth.token;
  const { removeToken } = useToken();
  const navigate = useNavigate();

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
    language: 0
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchData({ ...searchData, [name]: value });
  };

  const handleSelectSearchChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSearchData({ ...searchData, [name]: value });
  };

  const handleSubmitSearch = () => {
    const fetchAllExercise = async () => {
      try {
        let endpoint = 'http://localhost:5000/exercise/';
        if (searchData.search || searchData.difficulty || searchData.language) {
          endpoint += '/search?';

          let numOfParams = 0;

          if (searchData.search) {
            endpoint += `${numOfParams > 0 ? '&' : ''}q=${searchData.search}`;
            numOfParams++;
          }

          if (searchData.language > 0) {
            endpoint += `${numOfParams > 0 ? '&' : ''}lang=${searchData.language}`;
            numOfParams++;
          }

          if (searchData.difficulty) {
            endpoint += `${numOfParams > 0 ? '&' : ''}diff=${searchData.difficulty}`;
            numOfParams++;
          }
        } 

        const response = await axios.get(endpoint, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        setExerciseData(response.data.result);

      } catch (error: any) {
        if (error.response.status === 401) {
          removeToken();
          navigate('/login');
        }
      }
    }

    fetchAllExercise();
  };
  // =======================================
  
  // Filter options ========================
  const difficultyOption = [
    {
      option: 'Difficulty',
      value: ''
    },
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
      option: 'Language',
      value: 0
    },
    {
      option: 'English',
      value: 1
    },
    {
      option: 'Indonesian',
      value: 2
    },
    {
      option: 'Francais',
      value: 3
    },
    {
      option: 'Deutsch',
      value: 4
    },
  ];
  // =======================================

  // Exercise Data =========================
  const [exerciseData, setExerciseData] = useState<ExerciseData[]>([]);
  useEffect(() => {
    const fetchAllExercise = async () => {
      try {
        const response = await axios.get('http://localhost:5000/exercise/', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setExerciseData(response.data.result);
      } catch (error: any) {
        if (error.response.status === 401) {
          removeToken();
          navigate('/login');
        }
      }
    }

    fetchAllExercise();
  }, []);
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
          <PageTitle text='Exercises' create createUrl='/exercise/create'/>
        </div>

        {/* Search and Filter */}
        <div className='w-full max-w-[920px]'>
          <div>
            <div className='flex flex-col gap-2 w-full lg:flex-row'>
              <Searchbar onChange={handleSearchChange} />
              
              <div className='w-full flex gap-2'>
                <Filter name='language' options={languageOption} onChange={handleSelectSearchChange}/>
                <Filter name='difficulty' options={difficultyOption} onChange={handleSelectSearchChange}/>
              </div>

              <button
                onClick={handleSubmitSearch}
                className='bg-[--orange] text-white Poppins400 px-10 py-1 rounded-md w-full lg:w-fit'
              >
                Apply
              </button>
            </div>
          </div>
        </div>

        {/* Records */}
        <div className='w-full max-w-[920px] flex flex-col gap-2'>
          <table className='min-w-full divide-y divide-gray-400'>
            <tbody>
              <tr className=''>
                <th className='hidden lg:table-cell bg-[--orange] text-center text-white text-xs Poppins600 py-2'>No</th>
                <th className='bg-[--orange] text-center text-white text-xs Poppins600 py-2'>Lang</th>
                <th className='lg:hidden bg-[--orange] text-center text-white text-xs Poppins600 py-2'>Details</th>
                <th className='hidden lg:table-cell bg-[--orange] text-center text-white text-xs Poppins600 py-2'>Name</th>
                <th className='hidden lg:table-cell bg-[--orange] text-center text-white text-xs Poppins600 py-2'>Difficulty</th>
                <th className='bg-[--orange] text-center text-white text-xs Poppins600 py-2'>Actions</th>
              </tr>
              {
                exerciseData && exerciseData.map((exercise, number) => 
                  <ExerciseMobileCard
                    key={number}
                    id={exercise.exercise_id}
                    number={number + 1}
                    name={exercise.exe_name}
                    difficulty={exercise.difficulty}
                  />
                )
              }
            </tbody>
          </table>

        </div>
      </div>
    </div>
  );
};

export default Exercises;
