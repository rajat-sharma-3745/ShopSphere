import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addUser, deleteUser, fetchUsers, updateUser } from '../../redux/slice/adminSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

function UserManagement() {

//   const users=[
//     {
//         _id:123,
//         name:"John doe",
//         email:'john@abc.com',
//         role:'admin'
//     }
//   ]  


const dispatch = useDispatch();
const navigate = useNavigate();
const {user} = useSelector((state)=>state.auth);
const {users,loading,error,message} = useSelector((state)=>state.admin)

useEffect(()=>{
    if(user && user.role !== "admin"){
        navigate('/');
    }
},[user,navigate])


useEffect(()=>{
    if(user && user.role === "admin") 
    {
        dispatch(fetchUsers());
    }
},[dispatch ,user])


  const [formData,setFormData]=useState({
    name:'',
    email:'',
    password:'',
    role:'customer',  //default role
  })

  function handleChange(e){
    setFormData({
        ...formData,
        [e.target.name]:e.target.value
    })
  }
  useEffect(()=>{
    if(error){
        toast.error(error,{duration:1000})
    }
  },[error]);

 

  function handleSubmit(e){
    e.preventDefault();
    if(formData.password.length<6){
        toast.warning('Password should be atleast 6 characters long.',{duration:1000});
        return;
    }
    dispatch(addUser(formData)).then(()=>{ toast.success(message,{duration:1000})});
    //reset the form after submission
    setFormData({
        name:'',
        email:'',
        password:'',
        role:'customer',  //default role
      })
  }
  function handleRoleChange(userId,newRole){
      dispatch(updateUser({id:userId, role:newRole})).then(()=>{ toast.success("User updated successfully",{duration:1000})})
  }
  function handleDeleteUser(userId){
    if(window.confirm('Are you sure you want to delete this user?')){
        dispatch(deleteUser(userId)).then(()=>{ toast.success("User deleted successfully",{duration:1000})});
    }

  }
  return (
    <div className='max-w-7xl mx-auto p-6'>
        <h2 className='text-2xl font-bold mb-6'>User Management</h2>
        
        {/* Add new user form */}
        <div className='p-6 mb-6 rounded-lg'>
            <h3 className='text-lg font-bold mb-4'>Add new user</h3>
            <form onSubmit={handleSubmit} action="">
                <div className='mb-4'>
                    <label htmlFor="" className='block text-gray-700'>Name</label>
                    <input type="text" name='name' value={formData.name} onChange={handleChange} className='w-full p-2 border rounded' required/>
                </div>
                <div className='mb-4'>
                    <label htmlFor="" className='block text-gray-700'>Email</label>
                    <input type="email" name='email' value={formData.email} onChange={handleChange} className='w-full p-2 border rounded' required/>
                </div>
                <div className='mb-4'>
                    <label htmlFor="" className='block text-gray-700'>Password</label>
                    <input type="password" name='password' value={formData.password} onChange={handleChange} className='w-full p-2 border rounded' required/>
                </div>
                <div className='mb-4'>
                    <label htmlFor="" className='block text-gray-700'>Role</label>
                    <select  name="role" value={formData.role} onChange={handleChange} className='w-full p-2 border rounded' id="">
                        <option value="customer">Customer</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <button type='submit' className='bg-green-500 text-white py-2 px-4 cursor-pointer rounded hover:bg-green-600'>Add User</button>
            </form>
        </div>
         
        {loading && <p>Loading...</p> }
        {error && <p>Error : {error}</p> } 
        {/* User list */}
        <div className='overflow-x-auto shadow-md sm:rounded-lg'>
            <table className='min-w-full text-left text-gray-500'>
                <thead className='bg-gray-100 text-gray-700 text-xs uppercase'>
                    <tr>
                        <th className='py-3 px-4'>Name</th>
                        <th className='py-3 px-4'>Email</th>
                        <th className='py-3 px-4'>Role</th>
                        <th className='py-3 px-4'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length>0 &&
                     users.map((user)=>(
                        <tr key={user._id} className='border-b hover:bg-gray-50'>
                            <td className='p-4 text-gray-900 font-medium whitespace-nowrap'>
                                {user.name}
                            </td>
                            <td className='p-4'>{user.email}</td>
                            <td className='p-4'>
                                <select disabled={user.email === "admin@example.com"} name="" id="" value={user.role} onChange={(e)=>handleRoleChange(user._id,e.target.value)} className='p-2 border rounded'>
                                    <option value="customer">Customer</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </td>
                            {/* <td className='p-4'>{user.email}</td> */}
                            <td className='p-4'>
                                <button disabled={user.email === "admin@example.com"}  onClick={()=>handleDeleteUser(user._id)} className={`bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded ${user.email === "admin@example.com"?"cursor-not-allowed":"cursor-pointer"}`}> 
                                    Delete
                                </button>
                            </td>
                        </tr>
                    )) }
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default UserManagement