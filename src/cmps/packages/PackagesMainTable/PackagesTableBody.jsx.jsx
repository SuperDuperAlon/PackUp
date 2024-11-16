import { utilService } from '@/services/util.service'
import React from 'react'

const PackagesTableBody = ({packages, currPage, packagesPerPage, selectedItems, handleCheckboxChange, onSingleRemoval, router}) => {
  return (
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
                <button onClick={() => router.push(`/packages/edit/${p._id}`)}>ערוך</button>
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