import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';


// Async thunk to fetch products by collection and optional filter ,so we need to send the request to backend with the query parameters
export const fetchProductsByFilters = createAsyncThunk('products/fetchByFilters', async ({ collection,
    size,
    color,
    gender,
    minPrice,
    maxPrice,
    sortBy,
    search,
    category,
    material,
    brand,
    limit,
}) => {
    const query = new URLSearchParams(); // creating a url search param object which is used to work with query string part of the url
    if (collection) query.append("collection", collection);
    if (size) query.append("size", size);
    if (color) query.append("color", color);
    if (gender) query.append("gender", gender);
    if (minPrice) query.append("minPrice", minPrice);
    if (maxPrice) query.append("maxPrice", maxPrice);
    if (sortBy) query.append("sortBy", sortBy);
    if (search) query.append("search", search);
    if (category) query.append("category", category);
    if (material) query.append("material", material);
    if (brand) query.append("brand", brand);
    if (limit) query.append("limit", limit);

    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/?${query.toString()}`);

    return response.data

})

// Async thunk to fetch a single product by id
export const fetchProductDetails = createAsyncThunk('products/fetchProductDetails', async (id) => {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`)
    return response.data;
});

// Async thunk to update product
export const updateProduct = createAsyncThunk('products/updateProduct', async ({ id, productData }) => {
    const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`, productData,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`
            }
        }
    )
    return response.data;
});

// Async thunk to fetch similar products
export const fetchSimilarProducts = createAsyncThunk('products/fetchSimilarProducts', async ({ id }) => {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/similar/${id}`)
    return response.data
})


const productSlice = createSlice({
    name: "products",
    initialState: {
        products: [],
        selectedProduct: null, //store the currently viewed product
        similarProducts: [],
        loading: false,
        error: null,
        filters: {
            category: "",
            size: "",
            color: "",
            gender: "",
            brand: "",
            minPrice: "",
            maxPrice: "",
            sortBy: "",
            search: "",
            material: "",
            collection: "",
        },
    },
    reducers:{
        setFilters : (state,action)=>{
            state.filters = {...state.filters ,...action.payload} //merge the new filters with the current ones
        },
        cleanFilters : (state) => {
            state.filters = {
                category: "",
                size: "",
                color: "",
                gender: "",
                brand: "",
                minPrice: "",
                maxPrice: "",
                sortBy: "",
                search: "",
                material: "",
                collection: "", 
            }
        }
    },
    // get the data from backend through createAsyncThunk and then update the state in the extra reducer
    extraReducers :(builder)=>{
        builder
        // handle fetching products with filters
        .addCase(fetchProductsByFilters.pending,(state)=>{
            state.loading=true;
            state.error=null
        })
        .addCase(fetchProductsByFilters.fulfilled,(state, action)=>{
            state.loading=false;
            state.products=Array.isArray(action.payload) ? action.payload : []
        })
        .addCase(fetchProductsByFilters.rejected,(state, action)=>{
            state.loading = false;
            state.error = action.error.message
        })
        // handle fetching single product details
        .addCase(fetchProductDetails.pending,(state)=>{
            state.loading=true;
            state.error=null
        })
        .addCase(fetchProductDetails.fulfilled,(state, action)=>{
            state.loading=false;
            state.selectedProduct= action.payload;
        })
        .addCase(fetchProductDetails.rejected,(state, action)=>{
            state.loading = false;
            state.error = action.error.message
        })
        // handle updating product 
        .addCase(updateProduct.pending,(state)=>{
            state.loading=true;
            state.error=null
        })
        .addCase(updateProduct.fulfilled,(state, action)=>{
            state.loading=false;
            const updatedProduct = action.payload;
            // find the product in the list and update it
            const index = state.products.findIndex((product)=>product._id === updateProduct._id);
            if(index !== -1){
                // means it is in the list,
                state.products[index] = updateProduct
            }
        })
        .addCase(updateProduct.rejected,(state, action)=>{
            state.loading = false;
            state.error = action.error.message
        })
         // handle fetching similar product
         .addCase(fetchSimilarProducts.pending,(state)=>{
            state.loading=true;
            state.error=null
        })
        .addCase(fetchSimilarProducts.fulfilled,(state, action)=>{
            state.loading=false;
            state.similarProducts= action.payload;
        })
        .addCase(fetchSimilarProducts.rejected,(state, action)=>{
            state.loading = false;
            state.error = action.error.message
        })
    }
})

export const {cleanFilters,setFilters} = productSlice.actions;
export default productSlice.reducer;