/*import {createSlice,createAsyncThunk} from "@reduxjs/toolkit" 
 import axios from "axios"
const USERS_URL = 'https:jsonplaceholder.typicode.com/users'   */
import { createEntityAdapter, createSelector } from "@reduxjs/toolkit"
import { apiSlice } from '../api/apiSlice'
// const initialState = []


/*export const fetchUsers = createAsyncThunk('users/fetchUsers',async()=>{
    const resp = await axios.get(USERS_URL)
    return resp.data
})  */

 const userAdapter = createEntityAdapter()

const initialState = userAdapter.getInitialState()


export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers : builder.query({
            query: () => '/users',
            transformResponse: resp => userAdapter.setAll(initialState, resp),
            providesTags: (result, error, args)=>[
                {type: 'User', id:'List'},
                ...result.ids.map(id=>({
                    type:'User', id
                }))
            ]
        })
    })
})

/* --- api slice hooks --- */
export const {
    useGetUsersQuery
} = userApiSlice 

/* --- select userdata ---*/
export const selectUserResult = userApiSlice.endpoints.getUsers.select()

const selectPostData = createSelector(
    selectUserResult,
    usersResult => usersResult.data
)
            
/* --- Post Adapter Selector --- */
export const {
    selectAll: selectAllUsers,
    selectById: selectUserById,
    selectIds: selectAllUsersId
} = userAdapter.getSelectors(state => selectPostData(state) ?? initialState )
