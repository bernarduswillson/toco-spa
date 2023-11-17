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
import VoucherCard from '../../components/molecules/VoucherCard';

interface SearchData {
  search: string;
}

interface VoucherData {
  voucher_id: number;
  code: string;
  amount: number;
};

const Vouchers = () => {
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
      name: "Vouchers",
      url: "/voucher",
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
  };

  const handleSubmitSearch = () => {
    const fetchAllVouchers = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/voucher/search?q=${searchData.search}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
        });
        setVoucherData(response.data.result);
      } catch (error: any) {
        if (error.response.status === 401) {
          removeToken();
          navigate('/login');
        }
      }
    };

    fetchAllVouchers();
  }
  // =======================================
  
  // Admin data ============================
  const [voucherData, setVoucherData] = useState<VoucherData[]>([]);
  useEffect(() => {
    const fetchAllVouchers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/voucher/', {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
        });
        setVoucherData(response.data.result);
      } catch (error: any) {
        if (error.response.status === 401) {
          removeToken();
          navigate('/login');
        }
      }
    };

    fetchAllVouchers();
  }, [])
  // =======================================
  
  return (
    <div className='flex'>
      {/* Sidebar */}
      <Sidebar active='Voucher'/>

      {/* Main content */}
      <div className='min-h-screen w-full py-5 lg:py-20 xl:py-28 pr-5 pl-28 flex flex-col gap-9 items-center'>
        
        {/* Header */}
        <div className="flex flex-col w-full max-w-[920px]">
          <Breadcrumbs urlPath={urlPath} />
          <PageTitle text='Vouchers' create createUrl='/voucher/create'/>
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
                <th className='lg:hidden bg-[--orange] text-center text-white text-xs Poppins600 py-2'>Voucher</th>
                <th className='hidden lg:table-cell bg-[--orange] text-center text-white text-xs Poppins600 py-2'>Code</th>
                <th className='hidden lg:table-cell bg-[--orange] text-center text-white text-xs Poppins600 py-2'>Reward</th>
                <th className='bg-[--orange] text-center text-white text-xs Poppins600 py-2'>Actions</th>
              </tr>
              {
                voucherData && voucherData.map((voucher, number) => 
                  <VoucherCard
                    key={number}
                    number={number + 1}
                    id={voucher.voucher_id}
                    code={voucher.code}
                    amount={voucher.amount}
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

export default Vouchers;
