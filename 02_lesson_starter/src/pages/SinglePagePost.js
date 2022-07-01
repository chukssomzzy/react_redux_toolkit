import {  useSelector }  from "react-redux"
import { selectPostById } from '../features/posts/postSlice.js'
import  PostAuthor  from '../Components/PostAuthor'
import TimeAgo  from "../Components/TimeAgo.js"
import ReactionButton from "../Components/ReactionButton.js"
import {useParams, Link} from 'react-router-dom'

const SinglePagePost = () => {
    const {postId} = useParams()
    const post = useSelector((state)=> selectPostById(state,Number(postId)))
    if(!post){
        return (
            <section>
                <h2>Post Not Found</h2>
            </section>
        )
    }
  return (
      <article>
          <h2>{post.title}</h2>
         <p>{post.body}</p>
      <p className="postCredit">
      <Link to={`/post/edit/${post.id}`}>Edit Post</Link>
          <PostAuthor userId={post.userId} />
          <TimeAgo timestamp={post.date} />
      </p>
        <ReactionButton post={post} />
      </article>
  )
}

export default SinglePagePost
