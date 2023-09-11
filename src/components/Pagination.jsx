import React, { useState } from 'react'

const Pagination = ({ page, setPage, max }) => {
  const [input, setInput] = useState(1)

  const nextPage = () => {
    setInput(input + 1)
    setPage(page + 1)
  }
  const previousPage = () => {
    setInput(input - 1)
    setPage(page - 1)
  }
  const onKeyDom = e => {
    if (e.keyCode == 13) {
      setPage(parseInt(e.target.value))
      if (parseInt(e.target.value < 1) || parseInt(e.target.value) > max || isNaN(parseInt(e.target.value))) {
        setPage(1)
        setInput(1)
      } else {
        setPage(parseInt(e.target.value))
      }
    }
  };
  const onChange = e => {
    setInput(e.target.value)
  }
  return (
    <div className = 'pagination'>
      <button disabled = {page === 1 || page < 1} className = 'pagination__btn' onClick = {previousPage}>Previous</button>
      <input 
        onChange = {e  => onChange(e)}
        onKeyDown = {e => onKeyDom(e)}
        name ='page' 
        autoComplete ='off' 
        className ='pagination__input' 
        value = {input}
      />
      <p className='pagination__max'>de {max}</p>
      <button disabled = {page === max || page > max} className ='pagination__btn' onClick = {nextPage}>Next</button>
    </div>
  )

}

export default Pagination
