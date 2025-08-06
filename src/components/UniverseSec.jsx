import React from 'react'
import { Link } from 'react-router'

function UniverseSec({universedata}) {

  return (
    <div className='container2 m-auto my-[30px]'>
    <h1 className='text-[#f2f2f2] text-[24px] ubisoft-bold my-[15px] '>Visit Ubisoft's Universes</h1>
    <div className='flex gap-[20px] overflow-x-auto xl:overflow-hidden flex-nowrap  scrollbar-hide'>

        {
            universedata.slice(0,3).map(item=>
                <div className='rounded-xl min-w-[300px]'>

                <Link to={`/`} className='overflow-hidden rounded-2xl '>
                <img src={item.sectionImg} className='w-[100%] hover:scale-101 duration-300 rounded-xl' alt="" />
                </Link>
                <div className='p-[8px]  flex flex-col justify-between'>
                    <div>
                        <h1 className='text-white ubisoft-bold '>
                           {item.title}
                        </h1>
                    </div>
                </div>
             </div>
            )
        }
        
         
    </div>
</div>
  )
}

export default UniverseSec