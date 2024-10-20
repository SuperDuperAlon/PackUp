// TODO: decide on pagination

import React, { useEffect, useState } from 'react'
import { MdFirstPage, MdLastPage, MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

const Pagination = ({ handlePageNumberChange, currPage, numOfPages }) => {

  return (
    <>
      <div className='pagination-cmp'>
        <button className='pagination-btn' onClick={() => handlePageNumberChange(1)}><MdLastPage /></button>
        <button className='pagination-btn' onClick={() => handlePageNumberChange(currPage - 1)}><MdArrowForwardIos /></button>
        {[...Array(numOfPages)].map((_, i) => (
          <button
            key={i + 1}
            onClick={() => handlePageNumberChange(i + 1)}
            className='pagination-btn'
          >
            {i + 1}
          </button>
        ))}
        <button className='pagination-btn' onClick={() => handlePageNumberChange(currPage + 1)}><MdArrowBackIos /></button>
        <button className='pagination-btn' onClick={() => handlePageNumberChange(numOfPages)}><MdFirstPage /></button>
      </div>
    </>
  )
}

export default Pagination