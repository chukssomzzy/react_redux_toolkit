import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import {selectUserById} from '../features/users/usersSlice.js'
import { useGetPostByUserIdQuery } from '../features/posts/postSlice.js'


const UserPage = () => {
    /* ---- Hooks ---- */
        const {userId} = useParams()
        const user = useSelector(state => selectUserById(state,Number(userId)))
    
        const {
            data: postsForUser,
            isLoading,
            isError,
            isSuccess,
            error
        } = useGetPostByUserIdQuery(userId)
       
    /* ---- Conditional Rendering ---- */
        let content 
      if (isLoading) 
          content = (
              <p>loading...  </p>
          ) 
    else if(isSuccess){
              const { ids, entities } = postsForUser
              content = ids.map(id => (
                  <li key={id} >
                        <Link to={`/post/${id}`}>{entities[id].title}</Link>
                  </li>
              ))
          }else if(isError) 
        content =<p>{error} </p>
      
  return (
      <section>
      <h2>{user?.name}</h2>
      <ol>
      {content}
      </ol>
      </section>
  )
}

export default UserPage
