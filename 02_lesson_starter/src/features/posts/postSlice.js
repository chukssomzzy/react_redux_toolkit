import { createSlice, createAsyncThunk, createSelector, createEntityAdapter} from '@reduxjs/toolkit';
import {sub} from 'date-fns';
import axios from "axios";
const POST_URL = "https://jsonplaceholder.typicode.com/Posts"

/* ---- create Entity adapter */
    const postAdapter = createEntityAdapter({
        sortCompare : (a,b) => b.date.localeCompare(a.date)
    })
/* --- initial State --- */
const initialState = postAdapter.getInitialState({
    status: 'idle',
    error: null,
    count:0
})

/* ---- Async Thunk ---- */
export const fetchPosts = createAsyncThunk('posts/fetchPost', async ()=>{
      const response = await axios.get(POST_URL)
        return response.data
})

export const addNewPost = createAsyncThunk("posts/addNewPost", async (initialData)=>{
       const resp = await axios.post(POST_URL,initialData)
       return resp.data
})


export const updatePost = createAsyncThunk('posts/updatePost', async (initialPost) => {
    const { id } = initialPost;
    try {
        const response = await axios.put(`${POST_URL}/${id}`, initialPost)

        return response.data
    } catch (err) {
        //return err.message;
        return initialPost; // only for testing Redux!
    }
})
export const deletePost = createAsyncThunk("posts/deletePost",async ({initialPost}) =>{
  const {id} = initialPost
    try{
        const resp = await axios.delete(`${POST_URL}/${id}`)
        if(resp?.status === 200) return  {id};
        return `${resp?.status}: ${resp?.statusText}`
    }  catch (e){
        return e.message
    }
})
   /* ------ REDUCER ------ */
const postsSlice = createSlice({
    name: 'posts', 
    initialState,
    reducers: {
        reactionAdded( state, action ) {
              const { postId, reaction } = action.payload 
              const existingPost = state.entities[postId];
               if(existingPost){
                   existingPost.reactions[reaction]++
               }

        },
        increaseCount(state, action){
             state.count = state.count + 1
        }
    },
    /* ----- Extra Reducers ----- */
    extraReducers(builder){
        builder
            .addCase(fetchPosts.pending,(state,action)=>{
            state.status= "loading"
            })
            .addCase(fetchPosts.fulfilled, (state, action) =>{
                state.status = "succeeded"
                let min = 1 ; 
                 const loadedPosts = action.payload.map(post => {
                         post.date = sub(new Date(), {minutes : min++}).toISOString();
                         post.reactions = {
                             thumbsup : 0,
                             rocket : 0,
                             heart : 0,
                             wow : 0,
                             coffee : 0,
                         }
                         return post
                     })
              // adds all loaded post to initialState 
                postAdapter.upsertMany(state, loadedPosts)
            })
                    .addCase(fetchPosts.rejected, (state, action)=>{
                        state.status = "failed"
                        state.error = action.error.message
                    }
                    ).addCase(addNewPost.fulfilled, (state, action)=>{
                        action.payload.userId = Number(action.payload.userId)
                        action.payload.date = new Date().toISOString()
                        action.payload.reactions =  {
                             thumbsup : 0,
                             rocket : 0,
                             heart : 0,
                             wow : 0,
                             coffee : 0,
                        }
                        postAdapter.addOne(state, action.payload)
                    })
                       .addCase(updatePost.fulfilled,(state,action)=>{
                           if(!action.payload?.id){
                               console.log('update could not be perform on the post')
                               console.log(action.payload)
                               return
                           }
                           action.payload.date = new Date().toISOString()
                           postAdapter.upsertOne(state, action.payload)
                       }).addCase(deletePost.fulfilled,(state, action)=>{
                          if(!action.payload?.id) {
                              console.log('Delete Could Not Be Completed')
                              console.log(action.payload)
                              return
                          }
                           const { id } = action.payload;
                           postAdapter.removeOne(state, id)
                       })
    }
})



/*----selectors ----*/

    /* post Adapter Selector */
export const {
    selectAll: selectAllPosts,
    selectById: selectPostById,
    selectIds: selectPostIds
}  = postAdapter.getSelector(state => state.posts)
export const getPostsStatus = (state) => state.posts.status
export const getPostsError = (state) => state.posts.error
export const selectPostByUserId = createSelector(
    [selectAllPosts,(state,userId)=> userId],
    (posts,userId) => posts.filter(post => post.userId === userId )
)
export const getCount = (state) => state.posts.count
/*-----action-----*/
export const {reactionAdded,increaseCount} = postsSlice.actions

/*-----reducer------*/
export default postsSlice.reducer
