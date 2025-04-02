import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


// fetch all users
export const fetchUsers = createAsyncThunk('admin/fetchUsers', async () => {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/users`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`
            }
        }
    );
    return response.data;

})

// Add user
export const addUser = createAsyncThunk('admin/addUser', async (userData, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/admin/users`, userData,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('userToken')}`
                }
            }
        );
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

// Update user info
export const updateUser = createAsyncThunk('admin/updateUser', async ({ id, name, email, role }) => {
    const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${id}`, { name, email, role },
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`
            }
        }
    );
    return response.data.user;

})

// Delete a user
export const deleteUser = createAsyncThunk('admin/deleteUser', async (id) => {
    await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${id}`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`
            }
        }
    );
    return id;

})

const adminSlice = createSlice({
    name: "admin",
    initialState: {
        users: [],
        loading: false,
        error: null,
        message:''
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        // fetch user
            .addCase(fetchUsers.pending, (state,) => {
                state.loading = true;
                state.error = null
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message
            })
        // add user
            .addCase(addUser.pending, (state,) => {
                state.loading = true;
                state.error = null
            })
            .addCase(addUser.fulfilled, (state, action) => {
                state.loading = false;
                state.message=action.payload.message;
                
                state.users.push(action.payload.user);
            })
            .addCase(addUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message
            })
            // update user
            .addCase(updateUser.fulfilled, (state, action) => {
                state.loading = false;
                console.log(action.payload);
                state.message=action.payload.message;
                const updatedUser = action.payload;
                const index = state.users.findIndex((user)=>user._id===updatedUser._id)
                if(index !== -1){
                    state.users[index] = updatedUser;
                }
            })
            // delete user
            .addCase(deleteUser.fulfilled, (state, action) => {

                state.users = state.users.filter((user)=>user._id !== action.payload);
                state.message=action.payload.message;
            })
    }
})


export default adminSlice.reducer