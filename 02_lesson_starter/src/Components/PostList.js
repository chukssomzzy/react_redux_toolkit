import React from 'react'
import {useSelector} from 'react-redux'
import { selectPostIds /*, getPostsStatus, getPostsError*/ } from "../features/posts/postSlice"
 import PostsExcerpt from "./PostsExcerpt.js"
import { useGetPostQuery } from '../features/posts/postSlice.js'
const PostList = () => {

    /*--- Hook ---*/

  //  const dispatch = useDispatch()
    const {
        isError,
        isSuccess,
        isLoading,
        error
    } = useGetPostQuery()
  /*  const postsError = useSelector(getPostsError)
    const postsStatus = useSelector(getPostsStatus) */
    const orderedPostsId = useSelector(selectPostIds) 


    /*---- useEffects ----*/
       /* useEffect(()=>{
         if(postsStatus === "idle"){
             dispatch(fetchPosts())
         }                                                        
       },[dispatch,postsStatus]) */
    /* --- JSX mini Components---- */
        


       let content;
    if(isLoading) {
        content = ( 
        <p> Loading ....</p>
        )
    }
    else if (isSuccess){
        content = orderedPostsId.map(postId => (
            <PostsExcerpt key={postId} postId={postId} />
        ))
        }
       else if(isError ){
            content = (
                <p>{error}</p>
            )
       }  

    /*----- JSX ----*/
  return (
    <section>
      {content}
      </section>
  )
}

export default PostList
