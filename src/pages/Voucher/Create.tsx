import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import useToast from '../../hooks/useToast';
import useToken from '../../hooks/useToken';

import Sidebar from '../../components/organisms/Sidebar';
import Breadcrumbs from '../../components/organisms/Breadcrumbs';
import PageTitle from '../../components/atoms/PageTitle';
import TextInput from '../../components/atoms/TextInput';
import NumberInput from '../../components/atoms/NumberInput';
import ConfirmationModal from '../../components/organisms/ConfirmationModal';

interface VoucherData {
  voucher_id: number;
  code: string;
  amount: number;
};

const Create = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const { showToast } = useToast();
  const token = auth.token;
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
      active: false
    },
    {
      id: 2,
      name: "New",
      url: "/voucher/create",
      active: true
    },
  ];
  // =======================================
  
  // Input values ==========================
  const [voucherData, setVoucherData] = useState<VoucherData>({
    voucher_id: 0,
    code: '',
    amount: 0,
  });
  
  // Validation
  const [isDataValid, setIsDataValid] = useState<boolean>(true);

  useEffect(() => {
    voucherData.code &&
    voucherData.amount > 0 ? (
      setIsDataValid(true)
    ) : (
      setIsDataValid(false)
    )
  }, [voucherData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    
    setVoucherData({ ...voucherData, [name]: value });
  };
  // =======================================
  
  // Modal =================================
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const handleCreate = () => {
    setIsCreateModalOpen(true);
  };
  const handleCancelCreate = () => {
    setIsCreateModalOpen(false);
  };

  // =======================================
  
  // Submit ================================
  // Handle release
  const handleConfirmCreate = async () => {
    const postVoucherData = async () => {

      if (!isDataValid) {
        showToast('Field cannot be empty!', 'error');
        return;
      }

      try {
        const response = await axios.post('http://localhost:5000/voucher/create', {
          code: voucherData.code,
          amount: voucherData.amount,
        }, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        console.log(response.data.result);
  
      } catch (error: any) {
        if (error.response.status === 401) {
          removeToken();
          navigate('/login');
        }
      }
      showToast('Create voucher successful', 'success');
      navigate("/voucher");
    };

    postVoucherData();
  };
  // =======================================

  return (
    <>
      {
        isCreateModalOpen && (
          <ConfirmationModal
            title='Create voucher?'
            message='Are you sure you want to create this voucher?'
            ok='Create'
            cancel='Cancel'
            onCancel={handleCancelCreate}
            onConfirm={handleConfirmCreate}
          />
        )
      }
    
      <div className='flex'>
        {/* Sidebar */}
        <Sidebar active='Merchandise'/>

        {/* Main content */}
        <div className='min-h-screen w-full py-5 lg:py-20 xl:py-28 pr-5 pl-28 flex flex-col gap-9 items-center'>
          
          {/* Header */}
          <div className="flex flex-col w-full max-w-[920px]">
            <Breadcrumbs urlPath={urlPath} />
            <PageTitle text='New Admin'/>
          </div>

          {/* Exercise Form */}
          <div className="flex flex-col gap-4 w-full max-w-[920px] mb-10">
            <TextInput
              name='code'
              value={voucherData.code}
              placeholder='Code'
              label='Voucher Code'
              onChange={handleInputChange}
            />
            <NumberInput
              name='amount'
              value={voucherData.amount}
              placeholder='Amount'
              label='Reward amount'
              onChange={handleInputChange}
            />
          </div>

          <div className="flex flex-col sm:flex-row-reverse justify-center gap-4 w-full">
            <button
              className='Poppins400 blue-purple-button px-12 py-3 rounded-md'
              onClick={handleCreate}
            >
              Create voucher
            </button>
            <Link to='/voucher'>
              <button
                className='w-full Poppins400 bg-white border-2 border-[--red] text-[--red] px-12 py-3 rounded-md'
              >
                Back
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Create;