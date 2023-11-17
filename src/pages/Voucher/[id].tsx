import React, { useState, useEffect } from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom';
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

const Edit = () => {
  const { id } = useParams();
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
      name: "Edit",
      url: `/voucher/${id}`,
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

  useEffect(() => {
    const validateVoucher = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/voucher/validate/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
      } catch (error: any) {
        if (error.response.status === 401) {
          removeToken();
          navigate('/login');
        }
        navigate('/404');
      }
    };

    const fetchVoucher = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/voucher/${id}`, {
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

    validateVoucher().then(fetchVoucher);
  }, [id, token]);
  
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
    console.log(voucherData);
  };
  // =======================================
  
  // Modal =================================
  const [isSaveModalOpen, setIsSaveModalOpen] = useState<boolean>(false);
  const handleSave = () => {
    setIsSaveModalOpen(true);
  };
  const handleCancelCreate = () => {
    setIsSaveModalOpen(false);
  };

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };
  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
  };
  // =======================================
  
  // Submit ================================
  // Handle edit
  const handleConfirmEdit = () => {
    const updateVoucherData = async () => {

      if (!isDataValid) {
        showToast('Field cannot be empty!', 'error');
        return;
      }

      try {
        await axios.put(`http://localhost:5000/voucher/edit/${id}`, {
          code: voucherData.code,
          amount: voucherData.amount,
        }, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        showToast('Edit voucher successful', 'success');
  
      } catch (error: any) {
        if (error.response.status === 401) {
          removeToken();
          navigate('/login');
        }
      }
    };

    updateVoucherData();
  };

  // Handle delete
  const handleConfirmDelete = () => {
    const deleteVoucherData = async () => {
      try {
        await axios.delete(`http://localhost:5000/voucher/delete/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        
        console.log()
        showToast('Delete voucher successful', 'success');
        navigate('/voucher');

      } catch (error: any) {
        if (error.response.status === 401) {
          removeToken();
          navigate('/login');
        }
      }
    };

    deleteVoucherData();
  }
  // =======================================

  return (
    <>
      {
        isSaveModalOpen && (
          <ConfirmationModal
            title='Edit voucher?'
            message='Are you sure you want to save changes to this voucher?'
            ok='Save'
            cancel='Cancel'
            onCancel={handleCancelCreate}
            onConfirm={handleConfirmEdit}
          />
        )
      }

      {
        isDeleteModalOpen && (
          <ConfirmationModal
            title='Delete voucher?'
            message='Are you sure you want to delete this voucher? This action cannot be undone'
            ok='Delete'
            cancel='Cancel'
            onCancel={handleCancelDelete}
            onConfirm={handleConfirmDelete}
          />
        )
      }
    
      <div className='flex'>
        {/* Sidebar */}
        <Sidebar active='Voucher'/>

        {/* Main content */}
        <div className='min-h-screen w-full py-5 lg:py-20 xl:py-28 pr-5 pl-28 flex flex-col gap-9 items-center'>
          
          {/* Header */}
          <div className="flex flex-col w-full max-w-[920px]">
            <Breadcrumbs urlPath={urlPath} />
            <PageTitle text='Edit Voucher'/>
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
              onClick={handleSave}
            >
              Edit admin
            </button>
            <button
              className='Poppins400 bg-[--red] text-white px-12 py-3 rounded-md'
              onClick={handleDelete}
            >
              Delete
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

export default Edit;