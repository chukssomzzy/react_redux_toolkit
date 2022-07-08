import { 
    /*  createSlice,
    createAsyncThunk,*/
    createSelector,
    createEntityAdapter
} from '@reduxjs/toolkit';
import {sub} from 'date-fns';
import { apiSlice } from '../api/apiSlice.js'
/*import axios from "axios";
const POST_URL = "https://jsonplaceholder.typicode.com/Posts"   */

/* ---- create Entity adapter */
    const postAdapter = createEntityAdapter({
        sortComparer : (a,b) => b.date.localeCompare(a.date)
    })
/* --- initial State --- */
const initialState = postAdapter.getInitialState()

 /* Api slice injected endpoints */

    export const extendedApiSlice = apiSlice.injectEndpoints({
        endpoints: builder =>({
            getPosts : builder.query({
                query: () => '/posts',
                transformResponse: resp => {
                    let min = 1
                    const loadedPosts = resp.map( post => {
                        if(!post?.date) 
                            post.date = sub(new Date(), {minutes: min++}).toISOString()
                        if(!post?.reactions)
                            post.reactions = {
                             thumbsup : 0,
                             rocket : 0,
                             heart : 0,
                             wow : 0,
                             coffee : 0,
                            }
                        return post
                    });
                     return postAdapter.setAll(initialState, loadedPosts)
                },
                providesTags : (result, error, args) =>[
                    {type : 'Post', id: "LIST"},
                    ...result.ids.map(id => ({type:'Post', id}))
                ]
            }),
            getPostByUserId : builder.query( {
                query : id => `/posts/?userId=${id}`,
                transformResponse: resp => {
                    let min = 1 
                    const loadedPosts = resp.map(post => {
                        if(!post?.date)
                            post.date = sub(new Date(), {minutes: min++}).toISOString()
                        if(!post?.reactions)
                            post.reactions ={
                             thumbsup : 0,
                             rocket : 0,
                             heart : 0,
                             wow : 0,
                             coffee : 0,
                            }
                        return post
                    })
                   return postAdapter.setAll(initialState, loadedPosts)
                },
                providesTags : (result, err, args) => [
                    ...result.ids.map( id => ({ type: 'Post', id}))
                ]
            }),
            addNewPost : builder.mutation({
                query: initialPost => ({
                    url : '/posts', 
                    method : 'POST',
                    body : {
                        ...initialPost,
                        userId: Number(initialPost.userId),
                        date: new Date().toISOString(),
                        reactions:{
                             thumbsup : 0,
                             rocket : 0,
                             heart : 0,
                             wow : 0,
                             coffee : 0,
                            }
                    }
                }) ,
                invalidatesTags : [
                    {type:'Post', id: 'List'}
                ]
            }),
            updatePost : builder.mutation({
                query : initialPost =>({
                    url: `/posts/${initialPost.id}`,
                    method: 'PUT',
                    body : {
                        ...initialPost,
                            date: new Date().toISOString()
                    }
                }),
                invalidatesTags: (res, error, args) =>[
                    {type : "Post", id: args.id}
                ]
            }) ,
            deletePost : builder.mutation ({
                query : ({ id }) => ({
                    url: `/posts/${id}`,
                    method : 'DELETE',
                    body : { id }
                }),
                invalidatesTags: (res, error, args) => [
                    {type : 'Post', id: args.id}
                ]
            }),
            addReactions : builder.mutation ({
                query : ({ postId, reactions })=> ({
                    url : `/posts/${postId}`,
                    method : 'PATCH',
                    body: {reactions}
                }),
                async onQueryStarted({ postId, reactions }, { dispatch, queryFulfilled}){
                    // 'updateQuerydata' requires the endpoints name and cached args 
                    // so it knows which pieces of cached state to update 
                    const patchResult = dispatch(
                        extendedApiSlice.util.updateQueryData('getPosts', undefined, draft =>{
                        // draft is an immer wrapper and can be mutated like create slice 
                            const post = draft.entities[postId]                    
                            if( post ) post.reactions = reactions
                        })
                    )
                
                try {
                    await queryFulfilled
                } catch {
                    patchResult.undo()
                }
                }
            })

        })
    })



/*----- Api Slice Hooks ------*/ 
    export const {
        useGetPostQuery,
        useGetPostByUserIdQuery,
        useAddNewPostMutation,
        useUpdatePostMutation,
        useDeletePostMutation,
        useAddReactionsMutation
    } 
= extendedApiSlice


/* ----- Selector ----*/


 // return query result obj
 export const selectPostResults = extendedApiSlice.endpoints.getPosts.select()


  // creates memoized selector
  
   const selectPostsData = createSelector(
       selectPostResults,
       postsResult => postsResult.data // normalized state obj with ids and entity
   )


    /* post Adapter Selector */
export const {
    selectAll: selectAllPosts,
    selectById: selectPostById,
    selectIds: selectPostIds
}  = postAdapter.getSelectors(state => selectPostsData(state) ?? initialState)


