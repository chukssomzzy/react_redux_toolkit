import React from 'react'
import { Routes,Route, Navigate } from "react-router-dom"
import SinglePagePost from './pages/SinglePagePost.js'
import PostList from "./Components/PostList"
import EditPostForm from "./Components/EditPostForm"
import AddPostForm from "./Components/AddPostForm"
import Layout from "./Components//Layout"
import UsersList from "./Components/UsersList.js"
import UserPage from "./pages/UserPage.js"
const App = () => {
  return (
    <Routes>
      <Route path="/" element={ <Layout/>}>
      <Route index element = {<PostList/>} />

      <Route path ="post">
      <Route index element = {<AddPostForm/>} />
      <Route path=":postId" element={ <SinglePagePost />}/>
      <Route path="edit/:postId" element={<EditPostForm/>} />
      </Route>
      {/*Catch all Route as 404*/}
      <Route path = "user">
      <Route index element={<UsersList/>}/>
      <Route path =":userId" element={<UserPage/>} />
      </Route>

      <Route path = "*" element ={<Navigate to="/" replace/>}/>
      </Route>
      </Routes>
  )
}

export default App
