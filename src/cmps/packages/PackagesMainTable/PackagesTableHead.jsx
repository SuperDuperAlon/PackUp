import React from 'react'

const PackagesTableHead = ({ packages, handleSortChange, handleSelectAllChange, selectedItems }) => {
    console.log('selectedItems', selectedItems)
    console.log('packages', packages)
    return (
        <>
            <thead>
                <tr>
                    <th>
                        <input type="checkbox"
                            onChange={handleSelectAllChange}
                            checked={packages && selectedItems.length === packages.length}

                                />
                    </th>

                    <th></th>
                    <th onClick={() => handleSortChange('apartmentReceiver')}>
                        עבור</th>
                    <th onClick={() => handleSortChange('fullPackageDescription')}>
                        תיאור החבילה</th>
                    <th onClick={() => handleSortChange('dateReceived')}>
                        תאריך קבלה
                    </th>
                    <th onClick={() => handleSortChange('lobbyPackReceivedBy')}>
                        מקבל החבילה</th>
                    <th onClick={() => handleSortChange('notesOnArrival')}>
                        הערות</th>
                    {/* <th></th> */}
                </tr>
            </thead>
        </>
    )
}

export default PackagesTableHead