import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import useToast from '../../hooks/useToast';

import Sidebar from '../../components/organisms/Sidebar';
import Breadcrumbs from '../../components/organisms/Breadcrumbs';
import PageTitle from '../../components/atoms/PageTitle';
import TextInput from '../../components/atoms/TextInput';
import NumberInput from '../../components/atoms/NumberInput';
import ConfirmationModal from '../../components/organisms/ConfirmationModal';
import FileInput from '../../components/atoms/FileInput';

interface AdminData {
  admin_id: number;
  email: string;
  username: string;
  password: string;
};

const Create = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const { showToast } = useToast();
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
      name: "Admins",
      url: "/admin",
      active: false
    },
    {
      id: 2,
      name: "New",
      url: "/admin/create",
      active: true
    },
  ];
  // =======================================
  
  // Input values ==========================
  const [adminData, setAdminData] = useState<AdminData>({
    admin_id: 0,
    username: '',
    email: '',
    password: '',
  });
  
  // Validation
  const [isDataValid, setIsDataValid] = useState<boolean>(true);

  useEffect(() => {
    adminData.username &&
    adminData.email &&
    adminData.password ? (
      setIsDataValid(true)
    ) : (
      setIsDataValid(false)
    )
  }, [adminData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    
    setAdminData({ ...adminData, [name]: value });
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
    const postAdminData = async () => {

      if (!isDataValid) {
        showToast('Field cannot be empty!', 'error');
        return;
      }

      try {
        await axios.post('http://localhost:5000/admin/create', {
          username: adminData.username,
          email: adminData.email,
          password: adminData.password,
        }, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
  
      } catch (error) {
        console.log(error);
        return;
      }
      showToast('Admin created successful', 'success');
      navigate("/admin");
    };

    postAdminData();
  };
  // =======================================

  return (
    <>
      {
        isCreateModalOpen && (
          <ConfirmationModal
            title='Release exercise?'
            message='Are you sure you want to release this exercise?'
            ok='Release'
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
              name='username'
              value={adminData.username}
              placeholder='Username'
              label='Username'
              onChange={handleInputChange}
            />
            <TextInput
              name='email'
              value={adminData.email}
              placeholder='Email'
              label='Email'
              onChange={handleInputChange}
            />
            <TextInput
              name='password'
              value={adminData.password}
              placeholder='Password'
              label='Password'
              onChange={handleInputChange}
            />
          </div>

          <div className="flex flex-col sm:flex-row-reverse justify-center gap-4 w-full">
            <button
              className='Poppins400 blue-purple-button px-12 py-3 rounded-md'
              onClick={handleCreate}
            >
              Create admin
            </button>
            <Link to='/merchandise'>
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