import React from 'react'
import Image from 'next/image'

const NavAd = () => {
  return (
    <div className='flex items-center justify-between p-4'>
        {/* search */}
        <div className="hidden md:flex items-center gap-2 text-xs rounded-full ring-1 ring-gray-200 px-2">
            <Image src="/search.png" alt="" width={22} height={22}/>
            <input type="text" placeholder="Search" className="w-[200px] p-2 bg-transparent outline-none" />
        </div>
        {/* icons and users */}
        <div className="flex items-center gap-6 justify-end w-full">
            <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer">
            <Image src="/message.png" alt="" width={20} height={20}/>
            </div>
            <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer relative">
            <Image src="/announcement.png" alt="" width={20} height={20} />
            <div className="absolute -top-3 -right-3 w-5 h-5 flex items-center justify-center bg-purple-400 text-white rounded-full text-sm">1</div>
            </div>
            <div className="flex flex-col">
                <span className="text-xs leading-3 font">Rajib</span>
                <span className="text-[10px] text-gray-600 text-right">admin</span>

            </div>
        <Image src="/avatar.png" alt="" width={36} height={36} className="rounded-full"/>
        </div>
    </div>
  )
}

export default NavAd