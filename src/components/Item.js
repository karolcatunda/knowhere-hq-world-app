import React from 'react'

export default function Item(props) {
  const items = props?.items

  return(
    <div>
      <ul>
        { items &&
          items.map(item => {
            <ul>
              ${item.title}
            </ul>
          })
        }
      </ul>
    </div>
  )
}