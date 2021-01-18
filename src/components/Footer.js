import React, { useState } from 'react'

/**
 * Footer component aims to render the pagination numbers, from 
 * 1 to 20, additionally the buttons Mais and Anterior, to be 
 * able navigating forward or backward.
 * 
 * @param {Number} totalItems The total number of items found
 * @param {Number} updateOffset The function called when a page number was selected
 * @param {Number} firstNumber The saved first number of the current pagination set
 * @param {Number} lastNumber The saved last number of current the pagination set
 * 
 */
export default function Footer(props) {
  const totalItems = props?.totalItems;
  const updateOffset = props?.updateOffset;
  const firstNumber = props?.footerFirstSavedNumber;
  const lastNumber = props?.footerLastSavedNumber;
  const [firstPaginationNumber, setFirstPaginationNumber] = useState(firstNumber);
  const [lastPaginationNumber, setLastPaginationNumber] = useState(lastNumber);

  const backwardText = 'Anterior';
  const forwardText = 'Mais';

  const pageNumbers = [];
  let startIndexCount = 0;
  const itemsPerPage = 20;

  for (let paginationNumber = 1; paginationNumber <= Math.ceil(totalItems / itemsPerPage); paginationNumber++) {
    if (paginationNumber !== 1) startIndexCount = startIndexCount + itemsPerPage;
    const pagination = {
      number: paginationNumber,
      startIndex: startIndexCount
    };

    pageNumbers.push(pagination);
  }

  function getNextPaginationNumbers() {
    setFirstPaginationNumber(firstPaginationNumber + 20);
    setLastPaginationNumber(lastPaginationNumber + 20);
  }

  function getPreviousPaginationNumbers() {
    setFirstPaginationNumber(firstPaginationNumber - 20);
    setLastPaginationNumber(lastPaginationNumber - 20);
  }

  return(
    <div className='footer'>
      <span
        className='footer-number'>
          <a href='/#' onClick={firstPaginationNumber === 0 ? undefined : () => getPreviousPaginationNumbers()}>
            {backwardText}
          </a>
      </span>
      {
        pageNumbers.slice(firstPaginationNumber, lastPaginationNumber).map((item => {
          return(
          <span
            key={item.number}
            className='footer-number'>
              <a
                key={item.id}
                href='/#'
                onClick={() => updateOffset(item.startIndex, firstPaginationNumber, lastPaginationNumber)}>
                  {item.number}
              </a>
          </span>
          )
        }))
      }
      <span><a href='/#' onClick={() => getNextPaginationNumbers()}>{forwardText}</a></span>
    </div>
  )
}