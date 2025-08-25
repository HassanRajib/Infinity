'use client'

import React from 'react'
import { FaPhoneAlt } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { SiGooglemaps } from "react-icons/si";

function Page() {
  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid md:grid-cols-2 gap-12 items-center'>
            <div>
                <h2 className='text-3xl font-bold mb-6'> 
                  Get in Touch
                </h2>
                <p className='text-xl text-gray-800 mb-8'>
                  We are here to provide you A-to-Z support for pursuing study abroad.
                </p>
                <div className='flex flex-row space-x-3 items-center mb-2 justify-items-start'>
                  <FaPhoneAlt className='w-6 h-6'/>
                  <p className=' space-x-0.5'> +880133 2527541</p>
                </div>
                <div className='flex flex-row space-x-3 items-center mb-2 justify-items-start'>
                  <IoIosMail className='w-8 h-8'/>
                  <p>infinity.pathwayz@variation.com</p>
                </div>
                <div className='flex flex-row space-x-3 items-center mb-2 justify-items-start'>
                  <SiGooglemaps className='w-8 h-8'/>
                  <p>Colibri, Apt.# A-4, House# 60, Road# 8,<br />
                  Block# C, Banani, Dhaka-1213.</p>
                </div>
            </div>
            <div className='p-8 rounded-xl '>
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.7296111484566!2d90.401579274393!3d23.792640987155234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c5f48770de5f%3A0x941f9947063cb15!2sVariation%20Communications%20Ltd.!5e0!3m2!1sen!2sbd!4v1756101201128!5m2!1sen!2sbd" width="650" height="550" className='rounded-lg shadow-md border-2 border-dashed'></iframe>
            </div>
        </div>

    </div>
  )
}

export default Page
