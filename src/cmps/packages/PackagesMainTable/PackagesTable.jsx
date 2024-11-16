import React from 'react'
import PackagesTableHead from './PackagesTableHead.jsx'
import PackagesTableBody from './PackagesTableBody.jsx'

const PackagesTable = ({packages, handleSortChange, handleSelectAllChange, handleCheckboxChange, onSingleRemoval, currPage, packagesPerPage, selectedItems}) => {
    return (
        <>
            <table>
                <PackagesTableHead handleSortChange={handleSortChange} handleSelectAllChange={handleSelectAllChange} />
                < PackagesTableBody packages={packages} currPage={currPage} packagesPerPage={packagesPerPage} selectedItems={selectedItems} handleCheckboxChange={handleCheckboxChange} onSingleRemoval={onSingleRemoval} />
            </table>
        </>
    )
}

export default PackagesTable