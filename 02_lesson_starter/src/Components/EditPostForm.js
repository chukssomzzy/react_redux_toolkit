import React,{useState} from 'react'
import { useDispatch, useSelector } from "react-redux"
import {selectPostById, updatePost,deletePost} from "../features/posts/postSlice.js"
import {selectAllUsers} from '../features/users/usersSlice.js'
import {useParams, useNavigate} from "react-router-dom"

const EditPostForm = () => {
    /*----Hooks -----*/
    const { postId } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const post = useSelector(state => selectPostById(state,Number(postId)))
    const users = useSelector(selectAllUsers)

    const [title, setTitle] = useState(post?.title)
    const [content, setContent] = useState(post?.body)
    const [userId, setUserId] = useState(post?.userId)
    const [requestStatus, setRequestStatus] = useState('idle')

    /*----Variables and Constants ----*/
        const onTitleChange = e => setTitle(e.target.value)
        const onAuthorChange = e => setUserId(Number(e.target.value))
        const onContentChange = e => setContent(e.target.value)
        const canSave = [userId, content, title].every(Boolean) && requestStatus === 'idle'
        const onSavePostClicked = () =>{
            if(canSave){
                try{
                    setRequestStatus("pending")
                    dispatch(updatePost({
                        id:post.id,
                        title,
                        body:content,
                        userId,
                        reactions: post.reactions
                    })).unwrap()
                    setTitle('')
                    setUserId('')
                    setContent('')
                    navigate(`/post/${postId}`)
                }catch (e){
                   console.error('failled to save post',e)
                }finally {
                    setRequestStatus('idle')
                }
            }
        }
    const onDeletePostClicked = ()=>{
        if(requestStatus === 'idle'){
        try{
        setRequestStatus("pending")
            dispatch(deletePost({
                id: post.id
            })).unwrap()
            setTitle('')
            setContent('')
            setUserId('')
            navigate('/')
        }   catch (e){
            console.error('failed to delete post',e)
        }  finally{
          setRequestStatus("idle")
        }
        }
    }
    /* --- JSX Variables.---*/
        const userOptions = users.map(user=>(
            <option 
            value={user.id}
            key={user.id}
            >{user.name}</option>
        ))
    /*----Conditional Rendering ---*/
        if(!post){
            return (
                <section>
                    <h2> Post Not Found</h2>
                </section>
            )
        }

  return (
      <section>
          <h2>Edit Post</h2>
          <form>
              <label htmlFor="postTitle">Post Title</label>
              <input id="postTitle" type="text" name="postTitle" value={title} onChange={onTitleChange}/>
      <label htmlFor="postAuthor">Author:</label>
      <select id="postAuthor" name="postAuthor" onChange={onAuthorChange} value={userId}>
          <option value=""></option>
            {userOptions}
      </select>
      <label  htmlFor="postContent">Content:</label>
      <textarea id="postContent" name="postContent" onChange={onContentChange} value={content}/>
      <button 
          type="button" 
          onClick={onSavePostClicked}
          disabled = {!canSave}
      >Save Post</button>
      <button
            type="button"
            onClick={onDeletePostClicked}
             className = "deleteButton"
      >Delete Post</button>
          </form>
      </section>
  )
}

export default EditPostForm
