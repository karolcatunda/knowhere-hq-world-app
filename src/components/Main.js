import React, { useEffect, useState } from 'react'
import axios from 'axios'
import crypto from 'crypto'
import { useLocation } from 'react-router-dom'
import Character from './Character'
import Footer from './Footer'

export default function Main() {

  const [searchResult, setSearchResult] = useState([])
  const [showItemDetails, setShowItemDetails] = useState(false)
  const [itemDetails, setItemDetails] = useState('')
  const [totalItems, setTotalItems] = useState(0)
  const [pendingRequest, setpendingRequest] = useState(false)
  const [offset, setOffset] = useState(0)
  const [footerFirstNumber, setFooterFirstNumber] = useState(0)
  const [footerLastNumber, setFooterLastNumber] = useState(20)

  const location = useLocation()

  const publicKey = 'ffe02fe070dbe410417ff60eb413ad0c'
  const privateKey = '2a1f2c11da7eec64122bb207ff04fb8142718214'

  const timestamp = new Date().getTime().toString();
  const hash = crypto.createHash('md5').update(timestamp + privateKey + publicKey).digest('hex')
  const requestParams = { params: { ts: timestamp, apikey: publicKey, hash: hash } }

  const showCharactersPanel = location.pathname === '/characters' ? true : false

  useEffect(() => {
    if (!showCharactersPanel) {
      setpendingRequest(true)
      setShowItemDetails(false)
      axios(`http://gateway.marvel.com/v1/public/comics?offset=${offset}`, requestParams)
      .then(response => {
        console.log('resp: ', response?.data?.data?.results)
        setSearchResult(response?.data?.data?.results)
        setTotalItems(response?.data?.data?.total)
      })
      .catch(error => {
        console.log('errortttt: ', error)
      })
      .finally(() => {
        setpendingRequest(false)
      })
    }
  }, [offset]) // eslint-disable-line react-hooks/exhaustive-deps

  function showItemPanel(item) {
    setShowItemDetails(true)
    setItemDetails(item)
  }

  function updateItems(offset, first, last) {
    setOffset(offset)
    setFooterFirstNumber(first)
    setFooterLastNumber(last)
  }

  const jarvisText = pendingRequest ? 'Aguarde enquanto Jarvis busca os resultados...' : ''

  return(
    <div className='main'>
        {pendingRequest && <span>{jarvisText}</span>}
        {!showCharactersPanel && !pendingRequest &&
          <div className='div1'>
            {searchResult.map(item => {
              return <a key={item.id} href='/#' onClick={() => showItemPanel(item)}><ul>{item.title}</ul></a>
            })}
            { totalItems !== 0 && <Footer totalItems={totalItems} updateOffset={updateItems} footerFirstSavedNumber={footerFirstNumber} footerLastSavedNumber={footerLastNumber} />}
          </div>
        }
        { showItemDetails && !pendingRequest &&
          <div className='div2'>
            <p><text className='close-icon'><a href='/#' onClick={() => setShowItemDetails(false)}>X</a></text></p>
            <img className='img-item-details' src={itemDetails.thumbnail.path + '/portrait_xlarge.' + itemDetails.thumbnail.extension} alt='' />
            <p className='item-details-text'><b>Título:</b> {itemDetails.title}</p>
            <p className='item-details-text'><b>Número de Páginas:</b> {itemDetails.pageCount}</p>
            <p className='item-details-text'><b>Descrição:</b> {itemDetails.description}</p>
          </div>
        }
        {showCharactersPanel &&
          <Character requestParams={requestParams}/>
        }
    </div>
  )
}