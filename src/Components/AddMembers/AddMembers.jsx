import React from 'react'
import "./AddMembers.css"

export default function AddMembers() {
  return (
    <div>
      <h2>Add New Member</h2>
      <form className='addMemberForm'>
        <input type="text" placeholder='Name' />
        <input type="email" placeholder='Email' />
        <input type="text" placeholder='Role' />
        <button type='submit'>Add Member</button>
      </form>
      
    </div>
  )
}
