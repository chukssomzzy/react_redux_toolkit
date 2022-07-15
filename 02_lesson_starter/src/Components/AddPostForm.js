import {useState} from 'react'
import {/*useDispatch,*/ useSelector} from "react-redux"
//import { addNewPost } from "../features/posts/postSlice"
import {selectAllUsers} from "../features/users/usersSlice.js"
import { useAddNewPostMutation } from '../features/posts/postSlice.js'
import { useNavigate } from 'react-router-dom'
const AddPostForm = () => {
    /*--- Hooks ---*/
    const [addNewPost, {isLoading}] = useAddNewPostMutation() 
    const navigate = useNavigate() 
   // const dispatch = useDispatch()
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [userId, setUserId] = useState('')
   // const [addRequestStatus, setAddRequestStatus] = useState('idle')
    const users = useSelector(selectAllUsers)

    const canSave = [title, content, userId].every(Boolean) && !isLoading
    /*---Functions----*/
    const onTitleChange = e => setTitle(e.target.value)
    const onContentChange = e => setContent(e.target.value)
    const onAuthorChange = e => setUserId(e.target.value)
    const onSavePostClicked = async () =>{
        if(canSave) {
            try {
                await addNewPost({
                    title,
                    body:content,
                    userId
                }).unwrap()
                setTitle('')
                setContent('')
                setUserId('')
                navigate('/')
            }catch (e){
                /*setAddRequestStatus('rejected')   */
                console.error("failed to save the post", e)
            }
        }
    }


    /*---- variables ----*/



    /*---jsx const---*/

        const userOptions = users.slice().map(user=>{
            return(
            <option key={user.id} value={user.id}>
            {user.name}
            </option>
        )
        })



    /*----JSX----*/

  return (
      <section>
          <h2>Add a new post</h2>
          <form action="">
              <label htmlFor="postTitle">Post Title</label>
              <input id="postTitle" type="text" name="postTitle" value={title} onChange={onTitleChange}/>
      <label htmlFor="postAuthor">Author:</label>
      <select id="postAuthor" name="postAuthor" onChange={onAuthorChange} value={userId}>
          <option value=""></option>
            {userOptions}
      </select>
      <label  htmlFor="postContent">Post Content</label>
      <input id="postContent" type="text" name="postContent" onChange={onContentChange} value={content}/>
      <button 
          type="button" 
          onClick={onSavePostClicked}
          disabled = {!canSave}
      >Save Post</button>
          </form>
      </section>
  )
}








export default AddPostForm
