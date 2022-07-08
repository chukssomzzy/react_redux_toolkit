import React from 'react'
 import {useSelector} from "react-redux"
import { Link } from 'react-router-dom'
import {selectAllUsers} from "../features/users/usersSlice.js"
const PostAuthor = ({userId}) => {
    /*---hooks ---*/
        const users = useSelector(selectAllUsers)
    /*--- variables ---*/
        const Author = users.find(user=> user.id === userId)
  return (
     <span>by {Author ? (<Link to={`/user/${userId}`}>{Author.name}</Link> ): "unknown author"}</span>
  )
}

export default PostAuthor
