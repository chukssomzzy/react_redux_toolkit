import React from 'react'
import {useSelector} from 'react-redux'
import { selectPostIds, getPostsStatus, getPostsError } from "../features/posts/postSlice"
 import PostsExcerpt from "./PostsExcerpt.js"

const PostList = () => {
    /*--- Hook ---*/
  //  const dispatch = useDispatch()
    const postsError = useSelector(getPostsError)
    const postsStatus = useSelector(getPostsStatus)
    const orderedPostsId = useSelector(selectPostIds)
    /*---- useEffects ----*/
       /* useEffect(()=>{
         if(postsStatus === "idle"){
             dispatch(fetchPosts())
         }                                                        
       },[dispatch,postsStatus]) */
    /* --- JSX mini Components---- */
                                                
       let content;
    if( postsStatus === "loading" ) {
        content = ( 
        <p> Loading ....</p>
        )
    }
    else if (postsStatus === "succeeded"){
        content = orderedPostsId.map(postId => (
            <PostsExcerpt key={postId} postId={postId} />
        ))
        }
       else if(postsStatus === "failed" ){
            content = (
                <p>{postsError}</p>
            )
       }  

    /*----- JSX ----*/
  return (
    <setion>
      {content}
      </setion>
  )
}

export default PostList
