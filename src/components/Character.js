import React, { useEffect, useState } from 'react'
import axios from 'axios'
import _ from 'lodash'
import Footer from './Footer'

export default function Character(props) {
  const requestParams = props?.requestParams
  const [characterList, setCharacterList] = useState([])
  const [totalItems, setTotalItems] = useState(0)
  const [searchText, setSearchText] = useState('')
  const [pendingRequest, setPendingRequest] = useState(false)
  const [query, setQuery] = useState('')
  const [offset, setOffset] = useState(0)
  const [footerFirstNumber, setFooterFirstNumber] = useState(0)
  const [footerLastNumber, setFooterLastNumber] = useState(20)

  useEffect(() => {
    setPendingRequest(true)
    axios(`http://gateway.marvel.com/v1/public/characters?offset=${offset}${query}`, requestParams)
    .then(response => {
      setCharacterList(response?.data?.data?.results)
      setTotalItems(response?.data?.data?.total)
    })
    .catch(error => {
      console.log('errortttt: ', error)
    })
    .finally(() => {
      setPendingRequest(false)
    })
  }, [offset, query, requestParams])

  function updateItems(offset, first, last) {
    setOffset(offset)
    setFooterFirstNumber(first)
    setFooterLastNumber(last)
  }

  const jarvisText = pendingRequest ? 'Aguarde enquanto Jarvis busca os resultados...' : ''

  return(
    <>
      <div>
        <input className='character-input' type="text" value={searchText} placeholder='Ex. Iron Man, Wolverine, Charles Xavier...' size='40' onChange={event => setSearchText(event.target.value)} />
        <button onClick={() => {
          setOffset(0)
          setQuery(_.isEmpty(searchText) ? '' : `&name=${searchText}`)
        }
          
        }>
          Jarvis, pesquisar meu personagem!
        </button>
      </div>

      {
        <div className='jarvis-text'>{jarvisText}</div>
      }

      {characterList && !pendingRequest &&
        characterList.map((item => {
          return  (
            <div key={item.id}>
              <figure className='character-thumbnail'>
                <img src={item.thumbnail.path + '/portrait_medium.' + item.thumbnail.extension} alt='' />
                <figcaption className='figure-caption'>{item.name}</figcaption>
              </figure>
            </div>
          )
        }))
      }
      { !pendingRequest && !_.isEmpty(characterList) &&
          <Footer totalItems={totalItems} updateOffset={updateItems} footerFirstSavedNumber={footerFirstNumber} footerLastSavedNumber={footerLastNumber} />
        }
    </>
  )
}