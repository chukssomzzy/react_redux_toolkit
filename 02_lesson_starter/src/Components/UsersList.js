import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {selectAllUsers} from  "../features/users/usersSlice.js"


const UsersList = () => {
    /*---- Hooks ----*/

    const users = useSelector(selectAllUsers)

    /*---- JSX variables ---- */

    const renderedUsers = users.map(user => (
        <li key={user.id}>
        <Link to={`/user/${user.id}`}>{user.name}</Link>
        </li>
    ))

    /*---- JSX -----*/

  return (
    <section>
      <h2>Users</h2>
      <ul>
      {renderedUsers}
      </ul>
      </section>
  )
}

export default UsersList

/* for future me: if are u ever read these shit, i am impressed*/
