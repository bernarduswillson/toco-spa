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
import FileInput from '../../components/atoms/FileInput';

interface MerchandiseData {
  merchandise_id: number,
  image: File | undefined,
  name: string,
  price: number,
  desc: string
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
    image: undefined,
    name: '',
    price: 10,
    desc: ''
  });
  
  // Validation
  const [isDataValid, setIsDataValid] = useState<boolean>(true);

  useEffect(() => {
    merchandiseData.image &&
    merchandiseData.name &&
    merchandiseData.price > 0 &&
    merchandiseData.desc? (
      setIsDataValid(true)
    ) : (
      setIsDataValid(false)
    )
  }, [merchandiseData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    
    setMerchandiseData({ ...merchandiseData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files) {
      setMerchandiseData({ ...merchandiseData, image: e.target.files[0]})
    };;
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

  // =======================================
  
  // Submit ================================
  // Handle release
  const handleConfirmRelease = async () => {
    const postMerchandiseData = async () => {

      if (!isDataValid) {
        showToast('Field cannot be empty!', 'error');
        return;
      }

      try {
        await axios.post('http://localhost:5000/merch/create', {
          name: merchandiseData.name,
          desc: merchandiseData.desc,
          price: Number(merchandiseData.price),
          image: merchandiseData.image,
        }, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
          },
        });
  
      } catch (error: any) {
        if (error.response.status === 401) {
          removeToken();
          navigate('/login');
        }
        return;
      }
      navigate("/merchandise");
    };

    showToast('Release merchandise successful', 'success');
    postMerchandiseData();
  };
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
            <FileInput
              onChange={handleFileChange} 
            />
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
              Release merchandise
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