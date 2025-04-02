import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}`;
// const USER_TOKEN = 

// Fetch products
export const fetchAdminProducts = createAsyncThunk('adminProducts/fetchProducts',async()=>{
    const response = await axios.get(`${API_URL}/api/admin/products`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`
            }
        }
    )
    return response.data;
})

// create a new product
export const createProduct = createAsyncThunk('adminProducts/createProduct' ,async(productData)=>{
   const response = await axios.post(`${API_URL}/api/admin/products`,productData,
    {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`
        }
    }
   )
   return response.data
})

// Update an existing product
export const updateProduct = createAsyncThunk('adminProducts/updateProduct', async({id,productData})=>{
    const response = await axios.put(`${API_URL}/api/admin/products/${id}`,productData,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`
            }
        }
       )
       return response.data
})

// delete the product
export const deleteProduct = createAsyncThunk('adminProducts/deleteProduct',async(id)=>{
    await axios.delete(`${API_URL}/api/products/${id}`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`
            }
        }
       )
       return id;
})

const adminProductSlice = createSlice({
    name:"adminProducts",
    initialState:{
       products:[] ,
       loading:false,
       error:null
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchAdminProducts.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(fetchAdminProducts.fulfilled,(state,action)=>{
            state.loading=false;
            state.products=action.payload;
        })
        .addCase(fetchAdminProducts.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload.message;
        })
        // create product
        .addCase(createProduct.fulfilled,(state,action)=>{
            state.loading=false;
            state.products.push(action.payload)
        })
        // update product
        .addCase(updateProduct.fulfilled,(state,action)=>{
            state.loading=false;
            const updatedProduct = action.payload;
            const index = state.products.findIndex((product)=>product._id===updateProduct._id);
            if(index !== -1){
                state.products[index] = updateProduct
            }
        })
        // delete product
        .addCase(deleteProduct.fulfilled,(state,action)=>{
            state.loading=false;
            state.products = state.products.filter((product)=>product._id!==action.payload)
        })
    }
})


export default adminProductSlice.reducer;