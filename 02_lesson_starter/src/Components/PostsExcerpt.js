import React from 'react'
import PostAuthor from './PostAuthor.js'
import TimeAgo from './TimeAgo.js'
import ReactionButton from './ReactionButton.js'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'
import { selectPostById } from "../features/posts/postSlice.js"
const PostsExcerpt = ({postId}) => {
    const post = useSelector(state => selectPostById(state, postId))
  return (
        <article>
        <h2>{post.title}</h2>
        <p className="excerpt">{post?.body.substring(0,75)}</p>
        <p className="postCredit">
      <Link to={`/post/${post.id}`}>Read More</Link>
        <PostAuthor userId={post.userId} />
        <TimeAgo timeStamp={post.date} />
        </p>
        <ReactionButton post={post}/>
      </article>
  )
}


export default PostsExcerpt
