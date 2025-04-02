import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}`;
// const USER_TOKEN = `Bearer ${localStorage.getItem('userToken')}`;

// Fetch all orders
export const fetchAllOrders = createAsyncThunk('adminOrders/fetchAllOrders', async(_,{rejectWithValue})=>{
    try {
        const response = await axios.get(`${API_URL}/api/admin/orders`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('userToken')}`
                }
            }
        )
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
   
})

// update order delivery status
export const updateOrderStatus = createAsyncThunk('adminOrders/updateOrderStatus', async({id,status},{rejectWithValue})=>{
    try {
        const response = await axios.put(`${API_URL}/api/admin/orders/${id}`,{status},
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('userToken')}`
                }
            }
        )
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
   
})

// Delete an order 
export const deleteOrder = createAsyncThunk('adminOrders/deleteOrder', async(id,{rejectWithValue})=>{
    try {
         await axios.delete(`${API_URL}/api/admin/orders/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('userToken')}`
                }
            }
        )
        return id;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
   
})

const adminOrderSlice =createSlice({
    name:"adminOrders",
    initialState:{
       orders:[], 
       totalOrders:0,
       totalSales:0,
       loading:false,
       error:null
    },
    reducers:{},
    extraReducers:(builder)=>{
      builder
    //   fetch all orders
      .addCase(fetchAllOrders.pending,(state)=>{
        state.loading=true;
        state.error=null;
      })
      .addCase(fetchAllOrders.fulfilled,(state,action)=>{
        state.loading=false;
        state.orders=action.payload;
        state.totalOrders=action.payload.length;
        // calculate total sales:
        const totalsales =action.payload.reduce((acc,order)=>acc+order.totalPrice,0);
        state.totalSales=totalsales;
      })
      .addCase(fetchAllOrders.rejected,(state,action)=>{
        state.loading=false;
        state.error=action.payload.message;
      })
    //   update 
    .addCase(updateOrderStatus.fulfilled,(state,action)=>{
        state.loading=false;
        console.log(action.payload)
        const updatedOrder = action.payload;
        const index = state.orders.findIndex((order)=>order._id===updatedOrder._id);
        if(index !== -1){
            state.orders[index] = updatedOrder
        }
        // const totalsales =action.payload.reduce((acc,order)=>acc+order.totalPrice,0);
        // state.totalSales=totalsales;
      })
    //   delete
    .addCase(deleteOrder.fulfilled,(state,action)=>{
        state.loading=false;
        state.orders=state.orders.filter((order)=>order._id!==action.payload)
      })
    }
})

export default adminOrderSlice.reducer