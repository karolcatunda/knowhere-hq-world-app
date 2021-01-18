import React from 'react';
import '../styles/index.scss'

/**
 * Sidebar component renders the App menus related
 * with Comics and Characters
 */
export default function Sidebar() {
  return(
    <div className='sidebar'>
      <ul>
        <a href='/'>Pesquisa de Comics</a>
      </ul>
      <ul>
      <a href='/characters'>Pesquisa de Personagens</a>
      </ul>
    </div>
  )
}