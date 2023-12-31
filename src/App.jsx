
import { useEffect, useRef, useState } from 'react'
import './App.css'
import useFetch from './hooks/useFetch'
import getRandomNumber from './utils/getRandomNumber'
import LocationInfo from './components/LocationInfo'
import ResidentCard from './components/ResidentCard'
import Loader from './components/Loader'
import Pagination from './components/Pagination'

function App() {

  const numberRandom = getRandomNumber(126)  
  const [inputValue, setInputValue] = useState(numberRandom)
  const [isLoader, setIsLoader] = useState(true)
  const [page, setPage] = useState(1) 
  const [perPage, setPerPage] = useState(3)
  
  
  
  const url = `https://rickandmortyapi.com/api/location/${inputValue || 'hola'}`
  const [ location, getLocation, hasError, isLoading ] = useFetch(url)


  useEffect(() => {
    getLocation()
  }, [inputValue])

  // useEffect for loader page
  useEffect(() => {
    const changeStateLoading = () => {
      const loader = document.querySelector('.loader')
      if (loader) {
        setTimeout(() => {
          setIsLoader(false)
          loader.classList.add('loader__hidden')
        },2000)
      }
    }
    changeStateLoading()
  }, [isLoader])

  // max variable for pagination component
  const max = Math.ceil(location?.residents.length / perPage)
  
  // Input handling, handleSubmit is so that the page is not updated
  const inputSearch = useRef()
 
  const handleSubmit = e => {
    e.preventDefault()
    setInputValue(inputSearch.current.value.trim())
  }


  // Autocomplete in location finder, return a value between 1 and 126
  const autoComplete = () => {
    const option = []
    for (let i = 0; i < 126; i++) {
      option.push(<option key={i} value={i}></option>)
    }
    return option
  }

  return (
    <div className='principal'>
      <Loader/>
      <img className='principal__header' src="./Rick-and-MortyTitulo.png" alt="" />
      <form className='principal__form' onSubmit={handleSubmit}>
        <input ref={inputSearch} type="text" placeholder='Enter a location' list='location'/>
        <button>SEARCH</button>
        <datalist id='location'>
          {autoComplete()}
        </datalist>
      </form>
      
      <audio controls>
        <source src='/Rick_and_Morty_Intro.mp3' type='audio/mp3'/>
      </audio>
      {
        isLoading
        ? <div>
            <h2 className='principal___error'>Loading...</h2>
            <img src="./load_rick_morty.gif" alt="" />
          </div>
        : (
          hasError
          ? <div>
              <h2 className='principal___error'> Hey! you must provide an id from 1 to 126 ❌🤖</h2>
              <img src="/404-error.png" alt="" />
            </div> 
          : (
            <>
              <LocationInfo
                location = {location}
              />
              <div className='principal__card'>
                {
                  location?.residents.slice(
                    (page - 1) * perPage,
                    (page - 1) * perPage + perPage
                  ).map(url => (
                    <ResidentCard 
                      key = {url}
                      url = {url}
                    />
                  ))
                }
              </div>
            </>
          )
        )
          
      }
      
      <Pagination page={page} setPage={setPage} max={max}/>
    </div>
  )
}

export default App
