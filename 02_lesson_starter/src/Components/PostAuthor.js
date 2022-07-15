import React from 'react'
 import {useSelector} from "react-redux"
import { Link } from 'react-router-dom'
import {selectUserById} from "../features/users/usersSlice.js"
const PostAuthor = ({userId}) => {
    /*---hooks ---*/
        const users = useSelector(state => selectUserById(state,userId))
    console.log(users)
    /*--- variables ---*/
        const Author = users
  return (
     <span>by {Author ? (<Link to={`/user/${userId}`}>{Author.name}</Link> ): "unknown author"}</span>
  )
}

export default PostAuthor
