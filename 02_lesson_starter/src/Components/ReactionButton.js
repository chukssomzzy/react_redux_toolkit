/*import {useDispatch} from "react-redux"  */
import { /*reactionAdded,*/ useAddReactionsMutation } from "../features/posts/postSlice.js"    
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
    //const dispatch = useDispatch()
    const [addReactions] = useAddReactionsMutation
    /*-----JSX -----*/
        const reactionButton = Object.entries(reactionEmoji).map(([name,emoji])=>(
            <button
            key={name}
            type="button"
            className = "reactionButton"
            onClick = {()=>{
            const newValue = post.reactions[name] + 1
                addReactions({postId: post.id, reactions:{...post.reactions, [name]:newValue}})
            } 
            }
            >
            {emoji} {post.reactions[name]}
            </button>
        ))
  return (
    <div>{reactionButton}</div>
  )
}                                                                      

export default ReactionButton
