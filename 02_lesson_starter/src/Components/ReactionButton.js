import {useDispatch} from "react-redux"
import { reactionAdded } from "../features/posts/postSlice.js"
import React from 'react'


const reactionEmoji = {
    thumbsup: '👍',
    rocket: '🚀',
    wow: '😮',
    heart: '❤️',
    coffee: '☕️',
}
const ReactionButton = ({post}) => {
    /*----Hooks ----*/
    const dispatch = useDispatch()

    /*-----JSX -----*/
        const reactionButton = Object.entries(reactionEmoji).map(([name,emoji])=>(
            <button
            key={name}
            type="button"
            className = "reactionButton"
            onClick = {()=> dispatch(reactionAdded({postId:post.id,reaction: name}))}
            >
            {emoji} {post.reactions[name]}
            </button>
        ))
  return (
    <div>{reactionButton}</div>
  )
}

export default ReactionButton
