"use client"

import React from 'react'
import { useRouter } from 'next/navigation'


const NavAd = () => {

  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    router.push("/"); // navigate to home
  };
  return (
    <div className='flex items-center justify-between p-4'>
        {/* search */}
        {/* <div className="hidden md:flex items-center gap-2 text-xs rounded-full ring-1 ring-gray-200 px-2">
            <Image src="/search.png" alt="" width={22} height={22}/>
            <input type="text" placeholder="Search" className="w-[200px] p-2 bg-transparent outline-none" />
        </div> */}
        {/* icons and users */}
        <div className="flex items-center gap-6 justify-end w-full">
            <button
      onClick={handleLogout}
      className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
    >
      Logout
    </button>
        
        </div>
    </div>
  )
}

export default NavAd