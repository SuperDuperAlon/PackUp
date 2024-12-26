import React from 'react'
import { utilService } from '@/services/util.service'
import RouteButton from '@/cmps/general/Buttons/RouteButton/RouteButton'
import { useAuth } from '@/context/AuthContext'
import { useLoader } from '@/context/LoaderContext'

const PackagesTableBody = ({ packages, currPage, onDeletePackage, packagesPerPage, selectedItems, handleCheckboxChange, onSingleRemoval }) => {
  const { admin } = useAuth();
  const { loading } = useLoader();

  if (!packages || !packages.length && loading) return <tbody><tr><td>אנא המתן</td></tr></tbody>
  else return (
    <>
      <tbody>
        {packages &&
          packages.slice((currPage - 1) * packagesPerPage, currPage * packagesPerPage).map((p) => (
            <tr key={p._id}>
              <td><input type="checkbox"
                value={p._id}
                onChange={handleCheckboxChange}
                checked={selectedItems.includes(p._id)}
              /></td>
              <td className='table-actions'>
                <button onClick={() => onSingleRemoval(p._id)}>מסירה</button>
                <RouteButton content={'ערוך'} linkedRoute={`/packages/edit/${p._id}`} />
                {/* {admin && admin.isAdmin && <button onClick={() => onDeletePackage(p._id)}>מחק</button>} */}
              </td>
              <td>{p.receivingTenantFullTenantDesc}</td>
              <td>{p.fullPackageDescription}</td>
              <td>{utilService.parseDate(p.dateReceived)}</td>
              <td className='capitalize'>{p.lobbyPackReceivedBy}</td>
              <td>{p.notesOnArrival}</td>
              {/* <td ><EmailReminder /></td> */}
            </tr>
          ))
        }
      </tbody></>
  )
}

export default PackagesTableBody