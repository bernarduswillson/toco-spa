import React from 'react'

interface Crumb {
  id: number;
  name: string;
  url: string; 
  active: boolean;
}

interface urlPathProps {
  urlPath: Crumb[];
}

const Breadcrumbs = (props: urlPathProps) => {
  const { urlPath } = props;

  return (
    <div className='w-full flex flex-wrap items-center gap-2'>
      {
        urlPath.map((crumb) => {
          if (crumb.active) {
            return (
              <a href={crumb.url} className='Poppins400 text-[--orange] text-xs px-2 py-1 rounded-md flex items-center hover:bg-slate-200'>
                {crumb.name}
              </a>
            )
          } else {
            return (
              <>
                <a href={crumb.url} className='Poppins400 text-[--grey] text-xs px-2 py-1 rounded-md flex items-center hover:bg-slate-200'>
                  {crumb.name}
                </a>
                <img src="/icons/breadcrumb-arrow.svg" alt="right arrow" width={6}/>
              </>
            )
          }
        })
      }
    </div>
  )
}

export default Breadcrumbs