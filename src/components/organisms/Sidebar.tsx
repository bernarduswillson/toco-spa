import React, { useState } from 'react';

import NavItem from '../atoms/NavItem';

interface SidebarProps {
  active: "Home" | "Exercises" | "Merchandise"
}

const Sidebar = (props: SidebarProps) => {
  const { active } = props;

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
  ]

  // States
  const [isOpen, setIsOpen] = useState(false);

  // Toggle sidebar
  const handleToggle = () => {
    setIsOpen(() => !isOpen);
    console.log(isOpen);
  }

  return (
    <nav className={`bg-[--orange] sticky ${isOpen ? "w-[280px]" : "w-fit"} h-screen px-4 pb-5 transition-width duration-150 ease-in-out`}>

      {/* Toggle button */}
      <button
        className='absolute -right-12 top-6 bg-[--orange] w-[40px] h-[40px] rounded-full flex justify-center items-center'
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
            <a href="/" className='flex gap-3'>
                <img 
                  src="/icons/logo.svg"
                  alt="Toco logo"
                  width={56} 
                  draggable="false"/>
                <div className={`${isOpen ? 'flex' : 'hidden'} flex-col`}>
                  <span className='Poppins700 text-md text-[--white]'>Toco</span>
                  <span className='Poppins500 text-sm mt-[-5px] text-[--white]'>Admin</span>
                </div>
            </a>
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
          <NavItem
            label="Logout"
            destination="/"
            icon="/icons/nav-logout.svg"
            isOpen={isOpen}
          />
        </ul>
      </div>
    </nav>
  );  
};

export default Sidebar;