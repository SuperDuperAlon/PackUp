'use client'

import React, { useEffect, useState } from 'react'

const Loader = () => {

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {
        !isLoading &&
        <div className='loader'>Loader</div>
      }
    </>
  )
}

export default Loader