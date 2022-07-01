import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import {selectUserById} from '../features/users/usersSlice.js'
import { selectPostByUserId } from '../features/posts/postSlice.js'


const UserPage = () => {
    /* ---- Hooks ---- */
        const {userId} = useParams()
        const user = useSelector(state => selectUserById(state,Number(userId)))
       const postsForUser = useSelector((state) => selectPostByUserId(state,Number(userId)))
       
    /* ---- JSX variables ---- */
        const postTitles = postsForUser.map(post => (
            <li key={post.id}>
            <Link to={`/post/${post.id}`}>{post.title}</Link>
            </li>
        ))                              
  return (
      <section>
      <h2>{user?.name}</h2>
      <ol>
      {postTitles}
      </ol>
      </section>
  )
}

export default UserPage
