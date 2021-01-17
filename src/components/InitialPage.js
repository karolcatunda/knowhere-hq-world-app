import React from 'react'
import Sidebar from './Sidebar'
import Main from './Main'

export default function InitialPage() {
  return(
    <div className="App">
      <div className='main-container'>
        <Sidebar />
        <Main />  
      </div>
    </div>
  )
}