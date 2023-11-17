import React, { useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import useToken from '../../hooks/useToken';
import useAuth from '../../hooks/useAuth';
import 'react-toastify/dist/ReactToastify.css';

import Sidebar from '../../components/organisms/Sidebar';
import Breadcrumbs from '../../components/organisms/Breadcrumbs';
import PageTitle from '../../components/atoms/PageTitle';
import Searchbar from '../../components/atoms/Searchbar';
import MerchCard from '../../components/molecules/MerchCard';

interface SearchData {
  search: string;
}

interface MerchandiseData {
  merchandise_id: number;
  name: string;
  price: number;
  image: string;
  desc: string;
};

const Merchandises = () => {
  const navigate = useNavigate();
  const { removeToken } = useToken();
  const { auth } = useAuth();
  const token = auth.token;

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
      name: "Merchandises",
      url: "/merchandises",
      active: true
    },
  ];
  // =======================================

  // Search and filter data ================
  const [searchData, setSearchData] = useState<SearchData>({
    search: '',
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchData({ ...searchData, [name]: value });
    console.log(searchData.search);
  };

  const handleSubmitSearch = () => {
    const fetchAllMerchandise = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/merch/search?q=${searchData.search}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        setMerchandiseData(response.data.result);
      } catch (error: any) {
        if (error.response.status === 401) {
          removeToken();
          navigate('/login');
        }
      }
    };

    fetchAllMerchandise();
  }
  // =======================================
  
  // Exercise Data =========================
  const [merchandiseData, setMerchandiseData] = useState<MerchandiseData[]>([]);
  useEffect(() => {
    const fetchAllMerchandise = async () => {
      try {
        const response = await axios.get('http://localhost:5000/merch/', {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });
        setMerchandiseData(response.data.result);
      } catch (error: any) {
        if (error.response.status === 401) {
          removeToken();
          navigate('/login');
        }
      }
    };

    fetchAllMerchandise();
  }, [token])
  // =======================================
  
  return (
    <div className='flex'>
      {/* Sidebar */}
      <Sidebar active='Merchandise'/>

      {/* Main content */}
      <div className='min-h-screen w-full py-5 lg:py-20 xl:py-28 pr-5 pl-28 flex flex-col gap-9 items-center'>
        
        {/* Header */}
        <div className="flex flex-col w-full max-w-[920px]">
          <Breadcrumbs urlPath={urlPath} />
          <PageTitle text='Merchandises' create createUrl='/merchandise/create'/>
        </div>

        {/* Search and Filter */}
        <div className='w-full max-w-[920px]'>
          <div>
            <div className='flex flex-col gap-2 w-full lg:flex-row'>
              <Searchbar onChange={handleSearchChange} />
              
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
                <th className='bg-[--orange] text-center text-white text-xs Poppins600 py-2'>Image</th>
                <th className='lg:hidden bg-[--orange] text-center text-white text-xs Poppins600 py-2'>Details</th>
                <th className='hidden lg:table-cell bg-[--orange] text-center text-white text-xs Poppins600 py-2'>Name</th>
                <th className='hidden lg:table-cell bg-[--orange] text-center text-white text-xs Poppins600 py-2'>Price</th>
                <th className='hidden lg:table-cell bg-[--orange] text-center text-white text-xs Poppins600 py-2'>Description</th>
                <th className='bg-[--orange] text-center text-white text-xs Poppins600 py-2'>Actions</th>
              </tr>
              {
                merchandiseData && merchandiseData.map((merch, number) => 
                  <MerchCard
                    key={number}
                    id={merch.merchandise_id}
                    number={number + 1}
                    name={merch.name}
                    desc={merch.desc}
                    image={merch.image}
                    price={merch.price}
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

export default Merchandises;
