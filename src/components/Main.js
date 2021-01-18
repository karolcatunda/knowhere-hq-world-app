import React, { useEffect, useState } from 'react'
import axios from 'axios'
import crypto from 'crypto'
import { useLocation } from 'react-router-dom'
import Character from './Character'
import Footer from './Footer'
import { LOADING_REQUEST_MSG, DEFAULT_ERROR_MSG } from '../helpers/consts'

/**
 * Main component renders the components related to Comics from
 * /comics request and calls Character component in case it was called.
 * The items are displayed by the comic title and in case of this item is selected
 * a div will be opened showing the comic details with a thumbnail, title, number of
 * pages and a description. Also renders the Footer component for the searched comics.
 */
export default function Main() {
  const [searchResult, setSearchResult] = useState([]);
  const [showItemDetails, setShowItemDetails] = useState(false);
  const [itemDetails, setItemDetails] = useState('');
  const [totalItems, setTotalItems] = useState(0);
  const [pendingRequest, setpendingRequest] = useState(false);
  const [offset, setOffset] = useState(0);
  const [footerFirstNumber, setFooterFirstNumber] = useState(0);
  const [footerLastNumber, setFooterLastNumber] = useState(20);
  const [errorMsg, setErrorMsg] = useState('');
  const location = useLocation();

  const publicKey = 'ffe02fe070dbe410417ff60eb413ad0c';
  const privateKey = '2a1f2c11da7eec64122bb207ff04fb8142718214';

  const timestamp = new Date().getTime().toString();
  const hash = crypto.createHash('md5').update(timestamp + privateKey + publicKey).digest('hex');
  const requestParams = { params: { ts: timestamp, apikey: publicKey, hash: hash } };

  const showCharactersPanel = location.pathname === '/characters' ? true : false;
  const jarvisText = pendingRequest ? LOADING_REQUEST_MSG : '';

  const comicTitle = 'Título: '
  const comicNumberOfPages = 'Número de Páginas: '
  const comicDescription = 'Descrição: '
  const closeDetails = 'X'

  useEffect(() => {
    if (!showCharactersPanel) {
      setpendingRequest(true);
      setShowItemDetails(false);
      axios(`http://gateway.marvel.com/v1/public/comics?offset=${offset}`, requestParams)
      .then(response => {
        setSearchResult(response?.data?.data?.results);
        setTotalItems(response?.data?.data?.total);
      })
      .catch(() => {
        setErrorMsg(DEFAULT_ERROR_MSG);
      })
      .finally(() => {
        setpendingRequest(false);
      })
    }
  }, [offset]) // eslint-disable-line react-hooks/exhaustive-deps

  function showItemPanel(item) {
    setShowItemDetails(true);
    setItemDetails(item);
  }

  function updateItems(offset, first, last) {
    setOffset(offset);
    setFooterFirstNumber(first);
    setFooterLastNumber(last);
  }

  return(
    <div className='main'>
        {pendingRequest && <span>{jarvisText}</span>}

        { errorMsg && 
            <div className='div1'><span>{errorMsg}</span></div>
        }

        {!showCharactersPanel && !pendingRequest &&
          <div className='div1'>
            {searchResult.map(item => {
              return <a key={item?.id} href='/#' onClick={() => showItemPanel(item)}><ul>{item?.title}</ul></a>
            })}
            { totalItems !== 0 && 
                <Footer
                  totalItems={totalItems}
                  updateOffset={updateItems}
                  footerFirstSavedNumber={footerFirstNumber}
                  footerLastSavedNumber={footerLastNumber}
                />}
          </div>
        }

        { showItemDetails && !pendingRequest &&
          <div className='div2'>
            <p><span className='close-icon'><a href='/#' onClick={() => setShowItemDetails(false)}>{closeDetails}</a></span></p>
            <img className='img-item-details' src={itemDetails?.thumbnail?.path + '/portrait_xlarge.' + itemDetails?.thumbnail?.extension} alt='' />
            <p className='item-details-text'><b>{comicTitle}</b> {itemDetails?.title}</p>
            <p className='item-details-text'><b>{comicNumberOfPages}</b> {itemDetails?.pageCount}</p>
            <p className='item-details-text'><b>{comicDescription}</b> {itemDetails?.description}</p>
          </div>
        }

        {showCharactersPanel &&
          <Character requestParams={requestParams}/>
        }
    </div>
  )
}