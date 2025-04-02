import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


// Helper function for loading cart from local storage\
const loadCartFromStorage = () => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : { products: [] }
}

// Helper function to save the cart back to local storage
const saveCartToStorage = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart));
}


// Fetch cart for a user or guest
export const fetchCart = createAsyncThunk('cart/fetchCart', async ({ userId, guestId }, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/cart`, {
            params: { userId, guestId }
        })
        return response.data;
    } catch (error) {
        console.error(error);
        return rejectWithValue(error.response.data)
    }
})

// Add an item to the cart for user or guest
export const addToCart = createAsyncThunk('cart/addToCart', async ({ productId, quantity, size, color, guestId, userId }, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/cart`,
            { productId, quantity, size, color, guestId, userId }
        )
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data)
    }

})

// Update the quantity of item in an cart
export const updateCartItemQuantity = createAsyncThunk('cart/updateCartItemQuantity',async({productId, quantity, size, color, guestId, userId},{rejectWithValue})=>{
    try {
        const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/cart`,
            { productId, quantity, size, color, guestId, userId }
        )
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

// Remove an item from the cart
export const removeFromCart = createAsyncThunk('cart/removeFromCart',async({productId, size, color, guestId, userId},{rejectWithValue})=>{
    try {
        const response = await axios({
            method:"DELETE",
            url:`${import.meta.env.VITE_BACKEND_URL}/api/cart`,
            data:{productId, size, color, guestId, userId}
        })
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

// Merge guest cart into user cart
export const mergeCart = createAsyncThunk('cart/mergeCart',async({guestId,user},{rejectWithValue})=>{
  try {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/cart/merge`,{guestId, user },
        {
            headers:{
                Authorization:`Bearer ${localStorage.getItem('userToken')}`
            }
        }
    );
    return response.data
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
})


const cartSlice = createSlice({
    name:"cart",
    initialState:{
       cart:loadCartFromStorage(),
       loading:false,
       error:null
    },
    reducers:{
       clearCart:(state,action)=>{
         state.cart = {products:[]};
         localStorage.removeItem('cart');
       }
    },
    extraReducers:(builder)=>{
        builder
        // fetching cart
        .addCase(fetchCart.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(fetchCart.fulfilled,(state, action)=>{
            state.loading=false;
            state.cart=action.payload;
            saveCartToStorage(action.payload);
        })
        .addCase(fetchCart.rejected,(state, action)=>{
            state.loading=false;
            state.error=action.error.message || "Failed to fetch cart";
        })
        // add to cart
        .addCase(addToCart.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(addToCart.fulfilled,(state, action)=>{
            state.loading=false;
            state.cart=action.payload;
            saveCartToStorage(action.payload);
        })
        .addCase(addToCart.rejected,(state, action)=>{
            state.loading=false;
            state.error=action.payload?.message || "Failed to add to cart";
        })
        // update cart item quantity
        .addCase(updateCartItemQuantity.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(updateCartItemQuantity.fulfilled,(state, action)=>{
            state.loading=false;
            state.cart=action.payload;
            saveCartToStorage(action.payload);
        })
        .addCase(updateCartItemQuantity.rejected,(state, action)=>{
            state.loading=false;
            state.error=action.payload?.message || "Failed to update item quantity";
        })
        // remove cart item 
        .addCase(removeFromCart.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(removeFromCart.fulfilled,(state, action)=>{
            state.loading=false;
            state.cart=action.payload;
            saveCartToStorage(action.payload);
        })
        .addCase(removeFromCart.rejected,(state, action)=>{
            state.loading=false;
            state.error=action.payload?.message || "Failed to remove item";
        })
        // merge cart
        .addCase(mergeCart.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(mergeCart.fulfilled,(state, action)=>{
            state.loading=false;
            state.cart=action.payload;
            saveCartToStorage(action.payload);
        })
        .addCase(mergeCart.rejected,(state, action)=>{
            state.loading=false;
            state.error=action.payload?.message || "Failed to merge items";
        })
    }
})

export const {clearCart} = cartSlice.actions
export default cartSlice.reducer;