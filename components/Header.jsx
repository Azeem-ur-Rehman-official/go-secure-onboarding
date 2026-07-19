import Image from 'next/image'
import React from 'react'

const Header = () => {
  return (
    <div className='bg-[#0a0d14fa] p-4'>
        <Image src="/logo.webp" alt="logo" width={200} height={200} className=''/>
    </div>
  )
}

export default Header