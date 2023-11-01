import React from 'react';

interface NavItemProps {
  label: string,
  destination: string,
  icon: string,
  active?: boolean,
  isOpen: boolean
}

const NavItem = (props: NavItemProps) => {
  const { label, destination, icon, active, isOpen } = props;

  return (
    <a href={destination}>
      <li className={`px-4 py-3 flex ${isOpen ? '' : 'align-center justify-center'} gap-6 items-center rounded-md ${active ? 'bg-[#db651d]' : ''} hover:bg-[#db651d]`}>
        <img width={26} src={icon} alt={`${label} icon`} />
        <span className={`Poppins500 text-sm text-[--white] ${isOpen ? '' : 'hidden'}`}>
          {label}
        </span>
      </li>
    </a>
  );  
};

export default NavItem;