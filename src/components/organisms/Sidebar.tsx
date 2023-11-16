import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useToken from '../../hooks/useToken';

import NavItem from '../atoms/NavItem';
import ConfirmationModal from './ConfirmationModal';

interface SidebarProps {
  active: "Home" | "Exercises" | "Merchandise"
}

const Sidebar = (props: SidebarProps) => {
  const { active } = props;
  const navigate = useNavigate();
  const { removeToken } = useToken();

  // Nav items data
  const navChildData = [
    {
      id: 0,
      label: "Home",
      destination: "/",
      icon: "/icons/nav-home.svg"
    },
    {
      id: 1,
      label: "Exercises",
      destination: "/exercise",
      icon: "/icons/nav-exercise.svg"
    },
    {
      id: 2,
      label: "Merchandise",
      destination: "/merchandise",
      icon: "/icons/nav-merch.svg"
    },
    {
      id: 3,
      label: "Admin",
      destination: "/admin",
      icon: "/icons/nav-merch.svg"
    },
  ]

  // Toggle sidebar
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => {
    setIsOpen(() => !isOpen);
  }

  // Logout confimation modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCancel = () => {
    setIsModalOpen(false);
  }
  
  const handleConfirm = () => {
    removeToken();
    navigate('/login');
    setIsModalOpen(false);
  }

  return (
    <>
      {
        isModalOpen && (
          <ConfirmationModal
            title='Logout'
            message='You will be logged out from Toco'
            ok='Logout'
            cancel='Cancel'
            onCancel={handleCancel}
            onConfirm={handleConfirm}
            warning
          />
        )
      }

      <nav className={`bg-[--orange] min-w-fit fixed ${isOpen ? "w-[280px]" : "w-fit"} h-screen px-4 pb-5 transition-width duration-150 ease-in-out`}>

        {/* Toggle button */}
        <button
          className='absolute -right-12 top-6 bg-[--orange] w-[40px] h-[40px] rounded-full flex justify-center items-center opacity-50 hover:opacity-100'
          onClick={() => handleToggle()}
        >
          <img
            src={`${isOpen ? '/icons/nav-close.svg' : '/icons/nav-open.svg'}`}
            width={10}
            alt="toggle open" />
        </button>

        <div className="w-full h-full flex flex-col justify-between">
          <div className="flex flex-col gap-4">
            {/* Logo */}
            <div className="h-[100px] w-full flex items-center border-white border-b-[2px]">
              <Link to='/'>
                <div className='flex gap-3'>
                  <img 
                    src="/icons/logo.svg"
                    alt="Toco logo"
                    width={56} 
                    draggable="false"/>
                  <div className={`${isOpen ? 'flex' : 'hidden'} flex-col`}>
                    <span className='Poppins700 text-md text-[--white]'>Toco</span>
                    <span className='Poppins500 text-sm mt-[-5px] text-[--white]'>Admin</span>
                  </div>
                </div>
              </Link>
            </div>

            {/* Nav List */}
            <ul className='flex flex-col w-full h-fit'>
              {
                navChildData.map((navItem) => {
                  if (active === navItem.label) {
                    return (
                      <NavItem
                        key={navItem.id}
                        label={navItem.label}
                        destination={navItem.destination}
                        icon={navItem.icon}
                        isOpen={isOpen}
                        active
                      />
                    )
                  } else {
                    return (
                      <NavItem
                        key={navItem.id}
                        label={navItem.label}
                        destination={navItem.destination}
                        icon={navItem.icon}   
                        isOpen={isOpen}
                      />
                    )
                  }
                })
              }
            </ul>
          </div>
          
          {/* Nav Footer */}
          <ul className="nav-footer">
            <li
              onClick={() => setIsModalOpen(true)}
              className={`px-4 py-3 flex ${isOpen ? '' : 'align-center justify-center'} gap-6 items-center rounded-md hover:bg-[#db651d] cursor-pointer`}
            >
              <img width={26} src='/icons/nav-logout.svg' alt='Logout icon' />
              <span className={`Poppins500 text-sm text-[--white] ${isOpen ? '' : 'hidden'}`}>
                Logout
              </span>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );  
};

export default Sidebar;