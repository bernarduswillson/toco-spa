import React, { useState, useEffect } from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import useToast from '../../hooks/useToast';
import useToken from '../../hooks/useToken';
import 'react-toastify/dist/ReactToastify.css';

import Sidebar from '../../components/organisms/Sidebar';
import Breadcrumbs from '../../components/organisms/Breadcrumbs';
import PageTitle from '../../components/atoms/PageTitle';
import TextInput from '../../components/atoms/TextInput';
import NumberInput from '../../components/atoms/NumberInput';
import ConfirmationModal from '../../components/organisms/ConfirmationModal';

interface MerchandiseData {
  merchandise_id: number,
  image: string,
  name: string,
  price: number,
  desc: string
};

const Create = () => {
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
      name: "Merchandises",
      url: "/merchandise",
      active: false
    },
    {
      id: 2,
      name: "New",
      url: "/merchandise/create",
      active: true
    },
  ];
  // =======================================
  
  // Input values ==========================
  const [merchandiseData, setMerchandiseData] = useState<MerchandiseData>({
    merchandise_id: 0,
    image: 'merchandise.jpg',
    name: '',
    price: 10,
    desc: ''
  });

  // Fetch data
  useEffect(() => {
    const validateMerchandiseId = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/merch/validate/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.data.result) {
          navigate('/404');
          return;
        }
      } catch (error: any) {
        if (error.response.status === 401) {
          removeToken();
          navigate('/login');
        }
      }
    };

    const fetchMerchandiseData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/merch/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        
        setMerchandiseData(response.data.result);
      } catch (error: any) {
        if (error.response.status === 401) {
          removeToken();
          navigate('/login');
        }
      }
    };

    validateMerchandiseId().then(fetchMerchandiseData);
  }, [id])
  
   // Validation
  const [isDataValid, setIsDataValid] = useState<boolean>(true);

  useEffect(() => {
    merchandiseData.image &&
    merchandiseData.name &&
    merchandiseData.price > 0 &&
    merchandiseData.desc ? (
      setIsDataValid(true)
    ) : (
      setIsDataValid(false)
    )
  }, [merchandiseData])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    
    setMerchandiseData({ ...merchandiseData, [name]: value });
  };
  // =======================================
  
  // Modal =================================
  const [isReleaseModalOpen, setIsReleaseModalOpen] = useState<boolean>(false);
  const handleRelease = () => {
    setIsReleaseModalOpen(true);
  };
  const handleCancelRelease = () => {
    setIsReleaseModalOpen(false);
  };

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  }
  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
  }
  // =======================================
  
  // Submit ================================
  // Handle release
  const handleConfirmRelease = async () => {
    if (!isDataValid) {
      showToast('Field cannot be empty!', 'error');
      return;
    }

    try {
      await axios.put(`http://localhost:5000/merch/edit/${id}`, {
        name: merchandiseData.name,
        desc: merchandiseData.desc,
        price: Number(merchandiseData.price),
        image: merchandiseData.image,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      showToast('Update successful', 'success');

    } catch (error: any) {
      if (error.response.status === 401) {
        removeToken();
        navigate('/login');
      }
    }
  }

  // Handle delete
  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/merch/delete/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      showToast('Delete successful', 'success');
      navigate('/merchandise');
    } catch (error: any) {
      if (error.response.status === 401) {
        removeToken();
        navigate('/login');
      }
    }
  }
  // =======================================

  return (
    <>
      {
        isReleaseModalOpen && (
          <ConfirmationModal
            title='Release exercise?'
            message='Are you sure you want to release this exercise?'
            ok='Release'
            cancel='Cancel'
            onCancel={handleCancelRelease}
            onConfirm={handleConfirmRelease}
          />
        )
      }
      {
        isDeleteModalOpen && (
          <ConfirmationModal
            title='Delete merchandise?'
            message='Are you sure you want to delete this exercise? This action cannot be undone'
            ok='Delete'
            cancel='Cancel'
            onCancel={handleCancelDelete}
            onConfirm={handleConfirmDelete}
            warning
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
            <PageTitle text='New Merchandise'/>
          </div>

          {/* Exercise Form */}
          <div className="flex flex-col gap-4 w-full max-w-[920px] mb-10">
            {/* Meta */}
            {/* Image di sini */}
            <TextInput
              name='name'
              value={merchandiseData.name}
              placeholder='Merchandise name'
              label='Merchandise name'
              onChange={handleInputChange}
            />
            <TextInput
              name='desc'
              value={merchandiseData.desc}
              placeholder='Description'
              label='Description'
              onChange={handleInputChange}
            />
            <NumberInput
              name='price'
              value={merchandiseData.price}
              placeholder='Price'
              label='Price'
              onChange={handleInputChange}
            />
          </div>

          <div className="flex flex-col sm:flex-row-reverse justify-center gap-4 w-full">
            <button
              className='Poppins400 blue-purple-button px-12 py-3 rounded-md'
              onClick={handleRelease}
            >
              Save changes
            </button>
            <button
              className='Poppins400 bg-[--red] text-white px-12 py-3 rounded-md'
              onClick={handleDelete}
            >
              Delete
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