'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { FaInfoCircle } from "react-icons/fa";
import { FaExternalLinkAlt } from "react-icons/fa";


const GeneralInfo = () => {
  const [showGeneralInfo, setShowGeneralInfo] = useState(false)

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setShowGeneralInfo(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, []);

  function closeForm() {
    setShowGeneralInfo(false);
  }

  if (!showGeneralInfo) {
    return (
      <div className='general_info_container close' onClick={() => setShowGeneralInfo(!showGeneralInfo)}>
        <FaInfoCircle /> על הפרויקט
      </div>
    )
  }
  if (showGeneralInfo) return (
    <div className='general_info_container'>
      <button onClick={closeForm} className="general_info-btn-x">X</button>
      <h1>על הפרויקט</h1>
      <p>
        PackUp היא מערכת לניהול דואר וחבילות למגדלי מגורים, בהשראת האפליקציה myTLV המשמשת את מגדלי גינדי בתל אביב. מערכת זו נועדה להשתלב בפרויקט אישי גדול יותר בשם TowerOne
      </p>
      <p>
        המערכת כוללת מאפיינים מרכזיים כמו הוספה, עריכה, ומסירה בודדת או מרובה של דברי דואר,
        חיפוש חבילות על בסיס שם דייר ומספר דירה, ועמוד ארכיון לחבילות שנמסרו עם אפשרות לביטול מסירה (undo)
      </p>

      <div className="general_info__contact">
        <h4>צור קשר</h4>
        <ul>
          <li> אלון מליאבסקי | Alon Mlievski</li>
          <li><Link href='mailto:alonmlievski@gmail.com'>alonmlievski@gmail.com</Link></li>
          <li>050-443-8778</li>
          <li><Link href='https://www.linkedin.com/in/alon-mlievski-6756aa74/' target="_blank">Linkedin <FaExternalLinkAlt /> </Link></li>
          <li><Link href='https://github.com/SuperDuperAlon/PackUp' target="_blank"> PackUp Github <FaExternalLinkAlt /></Link></li>
          {/* <li>Alon Mlievski</li> */}
        </ul>
      </div>

      <button onClick={() => setShowGeneralInfo(false)}>סגור</button>
    </div>

  )
}

export default GeneralInfo