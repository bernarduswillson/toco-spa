import React, { useEffect, useState} from 'react';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router';
import useToken from '../../hooks/useToken';
import 'react-toastify/dist/ReactToastify.css';

import Sidebar from '../../components/organisms/Sidebar';
import Breadcrumbs from '../../components/organisms/Breadcrumbs';
import PageTitle from '../../components/atoms/PageTitle';
import Searchbar from '../../components/atoms/Searchbar';
import AdminCard from '../../components/molecules/AdminCard';

interface SearchData {
  search: string;
}

interface AdminData {
  admin_id: number;
  email: string;
  username: string;
};

const Admins = () => {
  const { auth } = useAuth();
  const token = auth.token;
  const navigate = useNavigate();
  const { removeToken } = useToken();

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
      name: "Admins",
      url: "/admins",
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
    const fetchAllAdmin = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/admin/search?q=${searchData.search}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
        });
        setAdminData(response.data.result);
      } catch (error: any) {
        if (error.response.status === 401) {
          removeToken();
          navigate('/login');
        }
      }
    }
    
    fetchAllAdmin();
  };
  // =======================================
  
  // Admin data ============================
  const [adminData, setAdminData] = useState<AdminData[]>([]);
  useEffect(() => {
    const fetchAllAdmin = async () => {
      try {
        const response = await axios.get('http://localhost:5000/admin/', {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
        });
        setAdminData(response.data.result);
      } catch (error: any) {
        if (error.response.status === 401) {
          removeToken();
          navigate('/login');
        }
      }
    };

    fetchAllAdmin();
  }, [])
  // =======================================
  
  return (
    <div className='flex'>
      {/* Sidebar */}
      <Sidebar active='Admin'/>

      {/* Main content */}
      <div className='min-h-screen w-full py-5 lg:py-20 xl:py-28 pr-5 pl-28 flex flex-col gap-9 items-center'>
        
        {/* Header */}
        <div className="flex flex-col w-full max-w-[920px]">
          <Breadcrumbs urlPath={urlPath} />
          <PageTitle text='Admins' create createUrl='/admin/create'/>
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
                <th className='lg:hidden bg-[--orange] text-center text-white text-xs Poppins600 py-2'>Admin</th>
                <th className='hidden lg:table-cell bg-[--orange] text-center text-white text-xs Poppins600 py-2'>Username</th>
                <th className='hidden lg:table-cell bg-[--orange] text-center text-white text-xs Poppins600 py-2'>Email</th>
                <th className='bg-[--orange] text-center text-white text-xs Poppins600 py-2'>Actions</th>
              </tr>
              {
                adminData && adminData.map((admin, number) => 
                  <AdminCard
                    key={number}
                    id={admin.admin_id}
                    number={number + 1}
                    username={admin.username}
                    email={admin.email}
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

export default Admins;
