import React, { useState, useEffect } from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import useToast from '../../hooks/useToast';

import Sidebar from '../../components/organisms/Sidebar';
import Breadcrumbs from '../../components/organisms/Breadcrumbs';
import PageTitle from '../../components/atoms/PageTitle';
import TextInput from '../../components/atoms/TextInput';
import ConfirmationModal from '../../components/organisms/ConfirmationModal';

interface AdminData {
  admin_id: number;
  email: string;
  username: string;
  password: string;
};

const Create = () => {
  const { id } = useParams();
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
      name: "Edit",
      url: "/admin/edit",
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

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/admin/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        setAdminData({ ...response.data.result, password: ''});
      } catch (error) {
        console.log(error);
      }
    };

    fetchAdmin();
  }, [id, token]);
  
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
    const updateAdminData = async () => {

      if (!isDataValid) {
        showToast('Field cannot be empty!', 'error');
        return;
      }

      try {
        await axios.put(`http://localhost:5000/admin/edit/${id}`, {
          username: adminData.username,
          email: adminData.email,
          password: adminData.password,
        }, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        showToast('Edit admin successful', 'success');
  
      } catch (error) {
        console.log(error);
        return;
      }
    };

    updateAdminData();
  };

  // Handle delete
  const handleConfirmDelete = () => {
    const deleteAdminData = async () => {
      try {
        await axios.delete(`http://localhost:5000/admin/delete/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        
        console.log()
        showToast('Delete admin successful', 'success');
        navigate('/admin');

      } catch (error) {
        console.log(error);
        return;
      }
    };

    deleteAdminData();
  }
  // =======================================

  return (
    <>
      {
        isCreateModalOpen && (
          <ConfirmationModal
            title='Edit admin?'
            message='Are you sure you want to save changes to this admin?'
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
            title='Delete admin?'
            message='Are you sure you want to delete this admin? This action cannot be undone'
            ok='Delete'
            cancel='Cancel'
            onCancel={handleCancelDelete}
            onConfirm={handleConfirmDelete}
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
              Edit admin
            </button>
            <button
              className='Poppins400 bg-[--red] text-white px-12 py-3 rounded-md'
              onClick={handleDelete}
            >
              Delete
            </button>
            <Link to='/admin'>
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