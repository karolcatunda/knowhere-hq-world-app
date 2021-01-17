import React, { useState } from 'react'

export default function Footer(props) {
  const totalItems = props?.totalItems
  const updateOffset = props?.updateOffset
  const firstNumber = props?.footerFirstSavedNumber
  const lastNumber = props?.footerLastSavedNumber
  const [firstPaginationNumber, setFirstPaginationNumber] = useState(firstNumber)
  const [lastPaginationNumber, setLastPaginationNumber] = useState(lastNumber)

  const pageNumbers = [];
  let startIndexCount = 0
  const itemsPerPage = 20

  for (let paginationNumber = 1; paginationNumber <= Math.ceil(totalItems / itemsPerPage); paginationNumber++) {
    if (paginationNumber !== 1) startIndexCount = startIndexCount + itemsPerPage
    const pagination = {
      number: paginationNumber,
      startIndex: startIndexCount
    };

    pageNumbers.push(pagination);
  }

  function getNextPaginationNumbers() {
    setFirstPaginationNumber(firstPaginationNumber + 20)
    setLastPaginationNumber(lastPaginationNumber + 20)
  }

  function getPreviousPaginationNumbers() {
    setFirstPaginationNumber(firstPaginationNumber - 20)
    setLastPaginationNumber(lastPaginationNumber - 20)
  }

  return(
    <div className='footer'>
      <span className='footer-number'><a href='/#' onClick={firstPaginationNumber === 0 ? undefined : () => getPreviousPaginationNumbers()}>Anterior</a></span>
      {
        pageNumbers.slice(firstPaginationNumber, lastPaginationNumber).map((item => {
          return(
          <span key={item.number} className='footer-number'><a key={item.id} href='/#' onClick={() => updateOffset(item.startIndex, firstPaginationNumber, lastPaginationNumber)}>{item.number}</a></span>
          )
        }))
      }
      <span><a href='/#' onClick={() => getNextPaginationNumbers()}>Mais</a></span>
    </div>
  )
}