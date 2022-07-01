import React from 'react'
 import {useSelector} from "react-redux"
import {selectAllUsers} from "../features/users/usersSlice.js"
const PostAuthor = ({userId}) => {
    /*---hooks ---*/
        const users = useSelector(selectAllUsers)
    /*--- variables ---*/
        const Author = users.find(user=> user.id === userId)
  return (
     <span>by {Author ? Author.name : "unknown author"}</span>
  )
}

export default PostAuthor
