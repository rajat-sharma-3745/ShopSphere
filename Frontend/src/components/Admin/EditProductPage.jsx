import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {AiOutlineClose} from 'react-icons/ai'
import { fetchProductDetails, updateProduct,  } from "../../redux/slice/productsSlice";
import axios from "axios";
import { toast } from "sonner";
import { BarLoader } from "react-spinners";

function EditProductPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {id} = useParams();
  const {selectedProduct,loading,error} = useSelector((state)=>state.products)

  const [productData,setProductData]=useState({
    name: "",
    description: "",
    price: 0,
    countInStock: 0,
    sku: "",
    category: "",
    brand: "",
    sizes: [],
    colors: [],
    collections: "",
    material: "",
    gender: "",
    images: [],
  });


  const [uploading,setIsUploading] = useState(false); //image uploading

  useEffect(()=>{
    if(id){
      dispatch(fetchProductDetails(id));
    }
  },[dispatch,id]);

  useEffect(()=>{
    if(selectedProduct){
      setProductData(selectedProduct);
    }
  },[selectedProduct])

  function handleChange(e){
    const {name, value} = e.target;
    setProductData(prevData=>({
        ...prevData,
        [name]:value 
    }))
  }
  {uploading && toast.info('Uploading Image...')}

  async function handleImageUpload(e){
    // e.target.files is FileList which contains all the files selected by the user, since a file input(input type='file') allows multiple files to be selected , e.target.files[0] selects the first file only 
    const file=e.target.files[0];
    const formData = new FormData(); // it creates a formData object which allows us to construct a set of key-value pairs representing form fields and their values.
    formData.append('image',file);

    try {
      setIsUploading(true);
      const {data} = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/upload`,formData,
        {
          headers: {
              "Content-Type":"multipart/form-data"
          },
      }
      )
      setProductData((prevData)=>({...prevData,
        images:[...prevData.images,{url:data.imageUrl,altText:""}]
      }))
      toast.success('Image Uploaded!');
      setIsUploading(false);
    } catch (error) {
        console.error(error);
        setIsUploading(false);
    }
  }

  function handleImageDelete(index){
    setProductData(prevData=>
    ({...prevData ,images:prevData.images.filter((_,id)=>id!==index)}))
    toast.success('Image Deleted')
  }
  function handleSubmit(e){
    e.preventDefault();
    dispatch(updateProduct({id,productData})).then(()=>{toast.success('Product updated!',{duration:2000})});
    navigate('/admin/products')
  }

  if (loading) return <div className="flex justify-center min-h-screen items-center">
        <BarLoader color="#f8e71c" /></div>;
  if (error) return <p>Error: {error}</p>;

  

  return <div className="max-w-5xl mx-auto p-6 shadow-md rounded-md">
    <h2 className="text-3xl font-bold mb-6"></h2>
    <form action="" onSubmit={handleSubmit}>
        {/* Name */}
        <div className="mb-6">
            <label htmlFor="" className="block font-semibold mb-2">Product Name</label>
            <input type="text" name="name" value={productData.name} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2 " required />
        </div>
        {/* Description */}
        <div className="mb-6">
            <label htmlFor="" className="block font-semibold mb-2">Desription</label>
            <textarea name="description" value={productData.description} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2 " rows={4} required id=""></textarea>
        </div>
        {/* Price info */}
        <div className="mb-6">
            <label htmlFor="" className="block font-semibold mb-2">Price</label>
            <input type="number" name="price" value={productData.price} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2" />
        </div>
        {/* count in stock */}
        <div className="mb-6">
            <label htmlFor="" className="block font-semibold mb-2">Count in Stock</label>
            <input type="number" name="countInStock" value={productData.countInStock} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2" />
        </div>
        {/* SKU */}
        <div className="mb-6">
            <label htmlFor="" className="block font-semibold mb-2">SKU</label>
            <input type="text" name="sku" value={productData.sku} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2" />
        </div>
        {/* Sizes */}
        <div className="mb-6">
            <label htmlFor="" className="block font-semibold mb-2">Sizes (comma-separated)</label>
            <input type="text" name="sizes" value={productData.sizes.join(', ')} onChange={(e)=>setProductData({...productData,sizes:e.target.value.split(',').map((size)=>size.trim())})} className="w-full border border-gray-300 rounded-md p-2" />
        </div>
        {/* Colors */}
        <div className="mb-6">
            <label htmlFor="" className="block font-semibold mb-2">Colors (comma-separated)</label>
            <input type="text" name="colors" value={productData.colors.join(', ')} onChange={(e)=>setProductData({...productData,colors:e.target.value.split(',').map((color)=>color.trim())})} className="w-full border border-gray-300 rounded-md p-2"/>
        </div>
        {/* Image Upload */}
        <div className="mb-6">
            <label htmlFor="" className="block font-semibold mb-2">Upload Image</label>
            <input type="file" onChange={handleImageUpload} className="bg-gray-300  rounded-md px-3 py-1 "  />
            {uploading && <p>Uploading image...</p> }
            <div className="flex gap-4 mt-4 ">
                {productData.images.map((image,index)=>(
                    <div key={index}>
                        <img src={image.url} alt={image.altText || "Product image"} className="w-20 h-20 object-cover rounded-md shadow-md" />
                        <button type="button" onClick={() => handleImageDelete(index)}> <AiOutlineClose/>  </button>
                    </div>
                ))} 
            </div>
        </div>
        <button type="submit" className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors duration-100 ">Update Product</button>
    </form>
  </div>;
}

export default EditProductPage;
