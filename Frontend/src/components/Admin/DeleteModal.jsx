import React from 'react'
import { IoClose } from "react-icons/io5";
const DeleteModal = ({onClose, onDelete}) => {
  return (
    <div className='min-h-screen w-full bg-black/50 z-20 fixed inset-0 flex justify-center items-center'>
        <div className='max-w-md w-full mx-auto  bg-white p-4 flex flex-col gap-4 rounded-md'>
            <div className='flex justify-between items-center'>
                <h2 className='text-xl font-semibold'>Are you sure?</h2>
                <div className='px-2 pt-1 hover:bg-gray-200 transition duration-300 rounded-lg text-xl'>
                <button onClick={onClose}><IoClose /></button>
                </div>
            </div>
            <div className='mb-3'>
                <h3>Are you sure to delete it?</h3>
            </div>
            <div className='flex gap-3 justify-end'>
                <button onClick={onClose} className='px-4 py-2 bg-gray-300 hover:bg-gray-400 transition duration-300 rounded-md'>Cancel</button>
                <button onClick={onDelete} className='px-4 py-2 bg-red-600 text-white font-semibold hover:bg-red-700 transition duration-300 rounded-md'>Delete</button>
            </div>
        </div>
    </div>
  )
}

export default DeleteModal