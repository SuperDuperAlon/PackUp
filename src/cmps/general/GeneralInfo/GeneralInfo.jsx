'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { FaInfoCircle } from "react-icons/fa";
import { FaExternalLinkAlt } from "react-icons/fa";


const GeneralInfo = () => {
  const [showGeneralInfo, setShowGeneralInfo] = useState(false)

  if (!showGeneralInfo) {
    return (
      <div className='general_info_container close' onClick={() => setShowGeneralInfo(!showGeneralInfo)}>
        <FaInfoCircle />
      </div>
    )
  }
  if (showGeneralInfo) return (
    <div className='general_info_container'>
      <h1>על הפרויקט</h1>
      <p>
        PackUp היא מערכת לניהול דואר וחבילות למגדלי מגורים, בהשראת האפליקציה myTLV המשמשת במגדלי גינדי. מערכת זו נועדה להשתלב בפרויקט אישי גדול יותר בשם TowerOne
      </p>
      <p>
        המערכת כוללת מאפיינים מרכזיים כמו הוספה, עריכה, ומסירה בודדת או מרובה של דברי דואר,
        חיפוש חבילות על בסיס שם דייר ומספר דירה, ועמוד ארכיון לחבילות שנמסרו עם אפשרות לביטול מסירה (undo)
      </p>
      <div className='general_info__guest_login'>
        <h4>פרטי כניסה</h4>
        <div>
          <div>כתובת מייל: <span>guest@pack.up</span></div>
          <div>סיסמא: <span>guest</span></div>
        </div>
      </div>

      <div className='general_info__links'>
        <h4>
          לינקים רלבנטיים
        </h4>
        <ul>
          <li><Link href='https://github.com/SuperDuperAlon/PackUp'><FaExternalLinkAlt /> PackUp Github</Link></li>
          <li><Link href='https://github.com/SuperDuperAlon/shift_manager_app'><FaExternalLinkAlt /> TowerOne Github</Link></li>
          <li><Link href='https://www.linkedin.com/in/alon-mlievski-6756aa74/'><FaExternalLinkAlt /> Linkedin</Link></li>

        </ul>
      </div>


      <button onClick={() => setShowGeneralInfo(!showGeneralInfo)}>סגור X</button>
    </div>

  )
}

export default GeneralInfo